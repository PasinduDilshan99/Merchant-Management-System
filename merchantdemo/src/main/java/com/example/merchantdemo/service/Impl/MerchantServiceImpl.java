package com.example.merchantdemo.service.Impl;

import com.example.merchantdemo.dao.MerchantDAO;
import com.example.merchantdemo.dao.StoreDAO;
import com.example.merchantdemo.dao.UserDAO;
import com.example.merchantdemo.dto.MerchantDto;
import com.example.merchantdemo.entity.Merchant;
import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.exception.InvalidInputsStringException;
import com.example.merchantdemo.exception.InvalidPhoneNumberException;
import com.example.merchantdemo.exception.InvalidUserIdException;
import com.example.merchantdemo.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MerchantServiceImpl implements MerchantService {

    private MerchantDAO merchantDAO;
    private UserDAO userDAO;
    private StoreDAO storeDAO;
    @Autowired
    public MerchantServiceImpl(MerchantDAO merchantDAO, UserDAO userDAO, StoreDAO storeDAO) {
        this.merchantDAO = merchantDAO;
        this.userDAO = userDAO;
        this.storeDAO = storeDAO;
    }

    @Override
    public ResponseEntity<Merchant> getMerchantById(int merchantId) {
        try{
            Merchant theMerchant = merchantDAO.getMerchantById(merchantId);
            return new ResponseEntity<>(theMerchant, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public ResponseEntity<List<Merchant>> getMerchantsByUserId(int userId) {
        if (userId < 0) {
            throw new InvalidUserIdException();
        }
        try {
            List<Merchant> theMerchants = merchantDAO.getMerchantsByUserId(userId);
            if (theMerchants.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(theMerchants, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Override
    @Transactional
    public ResponseEntity<String> addMerchant(MerchantDto merchantDto) {
        String phoneNumber = String.valueOf(merchantDto.getMerchantPhone());

//        boolean containsOnlyNumbers = false;
//        containsOnlyNumbers = phoneNumber1.matches("[0-9]+");
//        System.out.println(containsOnlyNumbers
//            throw new InvalidInputsStringException();
//        }
        Pattern p = Pattern.compile("[7][0-9]{8}");
        Matcher m = p.matcher(phoneNumber);
        boolean b = m.matches();

        if (!b) {
            throw new InvalidPhoneNumberException();
        }
        try {
            User user = userDAO.findUserByUserId(merchantDto.getUserId());
            Merchant merchant = new Merchant();
            merchant.setUser(user);
            merchant.setMerchantName(merchantDto.getMerchantName());
            merchant.setMerchantAddress(merchantDto.getMerchantAddress());
            merchant.setMerchantDescription(merchantDto.getMerchantDescription());
            merchant.setMerchantPhone(merchantDto.getMerchantPhone());
            merchant.setMerchantEmail(merchantDto.getMerchantEmail());
            merchantDAO.addMerchant(merchant);
            return new ResponseEntity<>("success", HttpStatus.CREATED);
        }
//        catch (HttpMessageNotReadableException e){
//            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
//        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Merchant> updateMerchant(MerchantDto merchantDto) {
        String phoneNumber = String.valueOf(merchantDto.getMerchantPhone());
        Pattern p = Pattern.compile("[7][0-9]{8}");
        Matcher m = p.matcher(phoneNumber);
        boolean b = m.matches();
        if (!b) {
            throw new InvalidPhoneNumberException();
        }

        try {
            User user = userDAO.findUserByUserId(merchantDto.getUserId());
            Merchant oldMerchant = merchantDAO.getMerchantById(merchantDto.getMerchantId());
            oldMerchant.setMerchantName(merchantDto.getMerchantName());
            oldMerchant.setMerchantDescription(merchantDto.getMerchantDescription());
            oldMerchant.setMerchantAddress(merchantDto.getMerchantAddress());
            oldMerchant.setMerchantPhone(merchantDto.getMerchantPhone());
            oldMerchant.setMerchantEmail(merchantDto.getMerchantEmail());
            Merchant theMerchant = merchantDAO.updateMerchant(oldMerchant);
            return new ResponseEntity<>(theMerchant,HttpStatus.OK);
        }catch (HttpMessageNotReadableException e){
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> changeMerchantStore(int theMerchantId, int theStoreNumber) {
        try {
            Store store = storeDAO.getStoreById(theStoreNumber);
            if (store == null) {
                return new ResponseEntity<>("Store not found", HttpStatus.OK);
            }
            Merchant theMerchant = merchantDAO.getMerchantById(theMerchantId);
            User theUser = theMerchant.getUser();
            List<Store> theStores = (List<Store>) storeDAO.getStoresByUserId(theUser.getUserId());

            boolean userCanAccessStore = false;
            for (Store theStore : theStores) {
                if (theStore.getStoreNumber() == theStoreNumber) {
                    userCanAccessStore = true;
                    break;
                }
            }

            if (userCanAccessStore) {
                List<Merchant> merchantList = merchantDAO.getAllMerchants();
                for (Merchant merchant : merchantList) {
                    Store merchantStore = merchant.getStore();
                    if (merchantStore != null && merchantStore.getStoreNumber() == theStoreNumber) {
                        return new ResponseEntity<>("Already exist", HttpStatus.OK);
                    }
                }
                theMerchant.setStore(store);
                return new ResponseEntity<>("Success", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User can't access this store", HttpStatus.OK);
                           }
        } catch (MethodArgumentTypeMismatchException ex){
            return new ResponseEntity<>("Invalid Input", HttpStatus.OK);
        }
        catch (HttpMessageNotReadableException e){
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>("There is no store Number" + theStoreNumber, HttpStatus.OK);
        }
    }



    @Override
    public ResponseEntity<List<Merchant>> getAllMerchants() {
        try {
            List<Merchant> theMerchants = merchantDAO.getAllMerchants();
            return new ResponseEntity<>(theMerchants, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }

    }


}
