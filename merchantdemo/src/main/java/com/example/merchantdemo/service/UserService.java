package com.example.merchantdemo.service;

import com.example.merchantdemo.dto.ChangePasswordDto;
import com.example.merchantdemo.dto.ResetPasswordDto;
import com.example.merchantdemo.dto.LoginUserDto;
import com.example.merchantdemo.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<User> findByName(String theName);

    ResponseEntity<String> addUser(User theUser);

    ResponseEntity<List<User>> findAll();

    ResponseEntity<String> loginUser(LoginUserDto loginUser);


   // String resetPassword(Question question, String userName);



    ResponseEntity<Integer> findUserIdByUserName(String theName);

    ResponseEntity<User> findUserByUserId(int theId);

    ResponseEntity<String> changePassword(ChangePasswordDto theChangePassword);

    ResponseEntity<String> resetPassword(ResetPasswordDto theResetPassword);
}
