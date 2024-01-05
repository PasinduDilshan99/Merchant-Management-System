package com.example.merchantdemo.controller;

import com.example.merchantdemo.dto.ChangePasswordDto;
import com.example.merchantdemo.dto.ResetPasswordDto;
import com.example.merchantdemo.dto.LoginUserDto;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> findAll(){
        return  userService.findAll();
    }

    @GetMapping("/{theName}")
    public ResponseEntity<User> findByName(@PathVariable String theName){
        return userService.findByName(theName);
    }

    @GetMapping("/userId/{theId}")
    public ResponseEntity<User> findUserByUserId(@PathVariable int theId){
        return userService.findUserByUserId(theId);
    }

    @GetMapping("/userName/{theName}")
    public ResponseEntity<Integer> findUserIdByUserName(@PathVariable String theName){
        return userService.findUserIdByUserName(theName);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestBody User theUser){
        return userService.addUser(theUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginUserDto loginUser){
      return userService.loginUser(loginUser);
    }

//    @PutMapping("/resetPassword/{userName}")
//    public String resetPassword(@RequestBody Question question, @PathVariable String userName){
//        return userService.resetPassword(question, userName);
//    }

    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto theChangePassword){
        return userService.changePassword(theChangePassword);
    }

    @PutMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDto theResetPassword){
        return userService.resetPassword(theResetPassword);
    }

}
