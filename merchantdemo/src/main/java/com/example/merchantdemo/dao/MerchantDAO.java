package com.example.merchantdemo.dao;

import com.example.merchantdemo.entity.Merchant;
import com.example.merchantdemo.entity.User;

import java.util.List;

public interface MerchantDAO {
    Merchant getMerchantById(int merchantId);

    List<Merchant> getMerchantsByUserId(int userId);

    Merchant addMerchant(Merchant theMerchant);

    Merchant updateMerchant(Merchant theMerchant);


    List<Merchant> getAllMerchants();


}
