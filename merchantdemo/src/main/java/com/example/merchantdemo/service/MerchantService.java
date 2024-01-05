package com.example.merchantdemo.service;

import com.example.merchantdemo.dto.MerchantDto;
import com.example.merchantdemo.entity.Merchant;
import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MerchantService {
    ResponseEntity<Merchant> getMerchantById(int merchantId);

    ResponseEntity<List<Merchant>> getMerchantsByUserId(int userId);

    ResponseEntity<String> addMerchant(MerchantDto theMerchant);

    ResponseEntity<Merchant> updateMerchant(MerchantDto theMerchant);


    ResponseEntity<String> changeMerchantStore(int theMerchantId, int theStoreNumber);


    ResponseEntity<List<Merchant>> getAllMerchants();
}
