package com.example.merchantdemo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_password")
    private String userPassword;
    @Column(name = "user_email")
    private String userEmail;
    @OneToOne
    private Question questions;
    @OneToMany(mappedBy = "user")
    private List<Store> stores;
    @OneToMany(mappedBy = "user")
    private List<Merchant> merchants;

    public User() {
    }

    public User(String userName, String userPassword, String userEmail, Question questions, List<Store> stores, List<Merchant> merchants) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.questions = questions;
        this.stores = stores;
        this.merchants = merchants;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Question getQuestions() {
        return questions;
    }

    public void setQuestions(Question questions) {
        this.questions = questions;
    }

    public List<Store> getStores() {
        return stores;
    }

    public void setStores(List<Store> stores) {
        this.stores = stores;
    }

    public List<Merchant> getMerchants() {
        return merchants;
    }

    public void setMerchants(List<Merchant> merchants) {
        this.merchants = merchants;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", questions=" + questions +
                ", stores=" + stores +
                ", merchants=" + merchants +
                '}';
    }
}
