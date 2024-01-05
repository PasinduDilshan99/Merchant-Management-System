package com.example.merchantdemo.service.Impl;

import com.example.merchantdemo.dao.StoreDAO;
import com.example.merchantdemo.dao.UserDAO;
import com.example.merchantdemo.dto.StoreDto;
import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.exception.InvalidStoreException;
import com.example.merchantdemo.exception.InvalidStoreIdException;
import com.example.merchantdemo.exception.InvalidUserIdException;
import com.example.merchantdemo.exception.UserDoesNotExistsException;
import com.example.merchantdemo.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    private StoreDAO storeDAO;
    private UserDAO userDAO;

    @Autowired
    public StoreServiceImpl(StoreDAO storeDAO, UserDAO userDAO) {
        this.storeDAO = storeDAO;
        this.userDAO = userDAO;
    }

    @Override
    @Transactional
    public ResponseEntity<Store> updateStore(StoreDto theStore) {
        int storeId = 0;
       storeId = theStore.getStoreNumber();
        if (storeId == 0 || storeId < 0) {
                throw new InvalidStoreIdException();
        }

            Store newStore = storeDAO.getStoreById(storeId);
            if (newStore == null) {
                throw new InvalidStoreException();
            }

            User theUser = newStore.getUser();
        if (theUser == null) {
            throw new UserDoesNotExistsException();
        }
        try {
            Store updateStore = new Store();
            updateStore.setUser(theUser);
            updateStore.setStoreNumber(theStore.getStoreNumber());
            updateStore.setStoreStatus(theStore.getStoreStatus());
            updateStore.setStoreType(theStore.getStoreType());
            storeDAO.updateStore(updateStore);
            return new ResponseEntity<>(updateStore, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Store>> findAllStores() {
        try {
            List<Store> theStores = storeDAO.findAllStores();
            return new ResponseEntity<>(theStores, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Store> getStoreById(int theStoreNumber) {
        if (theStoreNumber == 0 || theStoreNumber < 0) {
            throw new InvalidStoreIdException();
        }
        try {
            Store theStore = storeDAO.getStoreById(theStoreNumber);
            if (theStore == null) {
                throw new InvalidStoreException();
            }
            return new ResponseEntity<>(theStore, HttpStatus.OK);
        }
        catch (MethodArgumentTypeMismatchException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<Store>> getStoresByUserId(int userId) {
        if (userId == 0 || userId < 0) {
            throw new InvalidUserIdException();
        }

        User theUser = userDAO.findUserByUserId(userId);
        if (theUser == null) {
            throw new UserDoesNotExistsException();
        }else {
        try {
            List<Store> theStores = (List<Store>) storeDAO.getStoresByUserId(userId);
            return new ResponseEntity<>(theStores, HttpStatus.OK);
        }catch (MethodArgumentTypeMismatchException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }
    }
}
