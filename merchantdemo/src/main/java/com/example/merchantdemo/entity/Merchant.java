package com.example.merchantdemo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "merchant")
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private int merchantId;
    @Column(name = "m_name")
    private String merchantName;
    @Column(name = "m_address")
    private String merchantAddress;
    @Column(name = "m_description")
    private String merchantDescription;
    @Column(name = "m_phone")
    private int merchantPhone;
    @Column(name = "m_email")
    private String merchantEmail;
    @OneToOne
    private Store store;
    @ManyToOne
    @JsonIgnore
    private User user;


    public Merchant() {
    }

    public Merchant(String merchantName, String merchantAddress, String merchantDescription, int merchantPhone, String merchantEmail, Store store, User user) {
        this.merchantName = merchantName;
        this.merchantAddress = merchantAddress;
        this.merchantDescription = merchantDescription;
        this.merchantPhone = merchantPhone;
        this.merchantEmail = merchantEmail;
        this.store = store;
        this.user = user;
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

    @Override
    public String toString() {
        return "Merchant{" +
                "merchantId=" + merchantId +
                ", merchantName='" + merchantName + '\'' +
                ", merchantAddress='" + merchantAddress + '\'' +
                ", merchantDescription='" + merchantDescription + '\'' +
                ", merchantPhone=" + merchantPhone +
                ", merchantEmail='" + merchantEmail + '\'' +
                ", store=" + store +
                ", user=" + user +
                '}';
    }
}
