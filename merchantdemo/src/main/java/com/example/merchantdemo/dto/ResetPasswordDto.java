package com.example.merchantdemo.dto;

import com.example.merchantdemo.entity.Question;

public class ResetPasswordDto {
    private String userName;
    private Question answers;
    private String password;
    private  String reEnterPassword;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Question getAnswers() {
        return answers;
    }

    public void setAnswers(Question answers) {
        this.answers = answers;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReEnterPassword() {
        return reEnterPassword;
    }

    public void setReEnterPassword(String reEnterPassword) {
        this.reEnterPassword = reEnterPassword;
    }
}
