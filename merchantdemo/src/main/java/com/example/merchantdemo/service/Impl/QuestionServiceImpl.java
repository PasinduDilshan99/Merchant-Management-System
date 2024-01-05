package com.example.merchantdemo.service.Impl;

import com.example.merchantdemo.dao.QuestionDAO;
import com.example.merchantdemo.dao.UserDAO;
import com.example.merchantdemo.entity.Question;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.exception.EmptyUserInputsException;
import com.example.merchantdemo.exception.UserDoesNotExistsException;
import com.example.merchantdemo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private QuestionDAO questionDAO;
    private UserDAO userDAO;

    @Autowired
    public QuestionServiceImpl(QuestionDAO questionDAO, UserDAO userDAO) {
        this.questionDAO = questionDAO;
        this.userDAO = userDAO;
    }

    @Override
    @Transactional
    public ResponseEntity<Question> addQuestions(Question theQuestion, String theUserName) {
        if (theQuestion.getQ1().equals("") || theQuestion.getQ2().equals("") || theQuestion.getQ3().equals("")) {
            throw new EmptyUserInputsException();
        }else {
            Question returnQuestion ;
            try {
                 returnQuestion = questionDAO.addQuestions(theQuestion);

            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            User theUser = userDAO.findByName(theUserName);
            if (theUser == null) {
                throw new UserDoesNotExistsException();
            }else {
                theUser.setQuestions(returnQuestion);
                return new ResponseEntity<>(returnQuestion, HttpStatus.CREATED);
            }


        }

    }
}
