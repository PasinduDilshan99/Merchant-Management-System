package com.example.merchantdemo.dao;

import com.example.merchantdemo.entity.User;

import java.util.List;

public interface UserDAO {

    User findByName(String theName);
    User adduser(User theUser);
    List<User> findAll();

    boolean loginUser(String userName, String password);

    User findUserByUserId(int theId);

    void updateUser(User theUser);


    // String changePassword(LoginUser loginUser);
}
