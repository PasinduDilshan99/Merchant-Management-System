package com.example.merchantdemo.dto;

import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

public class MerchantDto {

    private int merchantId;
    private String merchantName;
    private String merchantAddress;
    private String merchantDescription;
    private int merchantPhone;
    private String merchantEmail;
    private Store store;
    private User user;
    private int userId;

    public MerchantDto(int merchantId, String merchantName, String merchantAddress, String merchantDescription, int merchantPhone, String merchantEmail, Store store, User user, int userId) {
        this.merchantId = merchantId;
        this.merchantName = merchantName;
        this.merchantAddress = merchantAddress;
        this.merchantDescription = merchantDescription;
        this.merchantPhone = merchantPhone;
        this.merchantEmail = merchantEmail;
        this.store = store;
        this.user = user;
        this.userId = userId;
    }

    public int getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(int merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getMerchantAddress() {
        return merchantAddress;
    }

    public void setMerchantAddress(String merchantAddress) {
        this.merchantAddress = merchantAddress;
    }

    public String getMerchantDescription() {
        return merchantDescription;
    }

    public void setMerchantDescription(String merchantDescription) {
        this.merchantDescription = merchantDescription;
    }

    public int getMerchantPhone() {
        return merchantPhone;
    }

    public void setMerchantPhone(int merchantPhone) {
        this.merchantPhone = merchantPhone;
    }

    public String getMerchantEmail() {
        return merchantEmail;
    }

    public void setMerchantEmail(String merchantEmail) {
        this.merchantEmail = merchantEmail;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
