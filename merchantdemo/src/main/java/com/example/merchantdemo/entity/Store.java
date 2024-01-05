package com.example.merchantdemo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_number")
    private int storeNumber;
    @Column(name = "store_type")
    private String storeType;
    @Column(name = "store_status")
    private String storeStatus;
    @ManyToOne
    @JsonIgnore
    private User user;

    public Store() {
    }

    public Store(String storeType, String storeStatus, User user) {
        this.storeType = storeType;
        this.storeStatus = storeStatus;
        this.user = user;
    }

    public int getStoreNumber() {
        return storeNumber;
    }

    public void setStoreNumber(int storeNumber) {
        this.storeNumber = storeNumber;
    }

    public String getStoreType() {
        return storeType;
    }

    public void setStoreType(String storeType) {
        this.storeType = storeType;
    }

    public String getStoreStatus() {
        return storeStatus;
    }

    public void setStoreStatus(String storeStatus) {
        this.storeStatus = storeStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Store{" +
                "storeNumber=" + storeNumber +
                ", storeType='" + storeType + '\'' +
                ", storeStatus='" + storeStatus + '\'' +
                ", user=" + user +
                '}';
    }
}
