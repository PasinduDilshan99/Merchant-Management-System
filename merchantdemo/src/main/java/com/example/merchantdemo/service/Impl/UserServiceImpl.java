package com.example.merchantdemo.service.Impl;

import com.example.merchantdemo.dao.UserDAO;
import com.example.merchantdemo.dto.ChangePasswordDto;
import com.example.merchantdemo.dto.ResetPasswordDto;
import com.example.merchantdemo.dto.LoginUserDto;
import com.example.merchantdemo.entity.Question;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.exception.AlreadyUserExistException;
import com.example.merchantdemo.exception.EmptyUserInputsException;
import com.example.merchantdemo.exception.UserDoesNotExistsException;
import com.example.merchantdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    @Transactional
    public ResponseEntity<String> addUser(User theUser) {
            String theName = theUser.getUserName();
            User tempUser = userDAO.findByName(theName);
            if (tempUser != null) {
                return new ResponseEntity<>("user exists", HttpStatus.CREATED);
                //throw new AlreadyUserExistException();
            } else {
                    userDAO.adduser(theUser);
                    return new ResponseEntity<>("successful", HttpStatus.CREATED);
            }
    }

    @Override
    public ResponseEntity<List<User>> findAll() {
        try {
            List theUsers = userDAO.findAll();
            return new ResponseEntity<>(theUsers, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> loginUser(LoginUserDto loginUser) {
        boolean Auth = false;
        try {
            String userName = loginUser.getUserName();
            String password = loginUser.getPassword();
          Auth = userDAO.loginUser(userName, password);
        }catch (Exception e){
              Auth = false;
        }

        if (Auth){
            return new ResponseEntity<>("successful", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }



//    @Override
//    public String resetPassword(Question question, String userName) {
//        String question1 = question.getQ1();
//        String question2 = question.getQ2();
//        String question3 = question.getQ3();
//        User theUser = userDAO.findByName(userName);
//        Question dbQuestion = theUser.getQuestions();
//        if (dbQuestion.getQ1().equals(question1) && dbQuestion.getQ2().equals(question2) && dbQuestion.getQ3().equals(question3)){
//            return "answers are correct";
//        }else {
//            return "please try again";
//        }
//
//    }


    @Override
    public ResponseEntity<Integer> findUserIdByUserName(String theName) {
        try {
            User theUser = userDAO.findByName(theName);
            int theId = theUser.getUserId();
            return  new ResponseEntity<>(theId, HttpStatus.OK);
        }catch (Exception e){
            throw new UserDoesNotExistsException();
        }

    }

    @Override
    public ResponseEntity<User> findUserByUserId(int theId) {
        try {
            User theUser = userDAO.findUserByUserId(theId);
            return new ResponseEntity<>(theUser, HttpStatus.OK);
        }catch (MethodArgumentTypeMismatchException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            throw new UserDoesNotExistsException();
        }


    }

    @Override
    @Transactional
    public ResponseEntity<String> changePassword(ChangePasswordDto theChangePassword) {
        if (theChangePassword.getUserName().equals("") || theChangePassword.getPassword().equals("")
                || theChangePassword.getNewPassword().equals("") || theChangePassword.getReEnterPassword().equals("")) {
                        throw new EmptyUserInputsException();
        }

        String theUserName = theChangePassword.getUserName();
        String theOldPassword = theChangePassword.getPassword();

        LoginUserDto theLoginUser = new LoginUserDto();
        theLoginUser.setUserName(theUserName);
        theLoginUser.setPassword(theOldPassword);

        ResponseEntity<String> loginValue1 = loginUser(theLoginUser);
            String loginValue = loginValue1.getBody();
       // System.out.println(value1);
       // String loginValue = String.valueOf(loginUser(theLoginUser));
       // System.out.println(loginValue);
        String returnMessage = "";

        if (!loginValue.equals("successful")) {
            returnMessage = "username and password are not matches";

        } else if (loginValue.equals("successful")) {
            String theNewPassword = theChangePassword.getNewPassword();
            String theReEnterPassword = theChangePassword.getReEnterPassword();

            if (theNewPassword.equals(theReEnterPassword) ) {
                User theUser = userDAO.findByName(theUserName);
                theUser.setUserPassword(theNewPassword);

                    userDAO.updateUser(theUser);


                returnMessage = "success";
            }else {
                returnMessage = "enter new password and re-enter new password are does not match";
            }
        }
        return new ResponseEntity<>(returnMessage, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<String> resetPassword(ResetPasswordDto theResetPassword) {
        if (theResetPassword.getUserName().equals("") || theResetPassword.getPassword().equals("")
                || theResetPassword.getAnswers().getQ1().equals("")|| theResetPassword.getAnswers().getQ2().equals("")
                || theResetPassword.getAnswers().getQ3().equals("") || theResetPassword.getReEnterPassword().equals("")) {
            throw new EmptyUserInputsException();
        }

        String returnValue = "";
        String theUserName = theResetPassword.getUserName();
        User theUser = userDAO.findByName(theUserName);
        if (theUser == null) {
          return  new ResponseEntity<>("user does not exist", HttpStatus.BAD_REQUEST);

        }
        Question theQuestion = theUser.getQuestions();
        Question theAnswers = theResetPassword.getAnswers();
        boolean bool = theQuestion.getQ1().equals(theAnswers.getQ1()) && theQuestion.getQ2().equals(theAnswers.getQ2()) && theQuestion.getQ3().equals(theAnswers.getQ3());
        returnValue = String.valueOf(bool);
        if (bool == true) {
            String thePassword = theResetPassword.getPassword();
            String reEnterPassword = theResetPassword.getReEnterPassword();
            if (thePassword.equals(reEnterPassword)){
                theUser.setUserPassword(thePassword);
                userDAO.updateUser(theUser);
                returnValue = "successfully reset password";
            }else {
                returnValue = "password and re-enter password are does not match";
            }
        }else{
            returnValue = "answers are incorrect";
        }

        return new ResponseEntity<>(returnValue, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<User> findByName(String theName) {
        User theUser = userDAO.findByName(theName);
        if (theUser == null) {
            throw new UserDoesNotExistsException();
        }
        return new ResponseEntity<>(theUser, HttpStatus.OK);
    }

}
