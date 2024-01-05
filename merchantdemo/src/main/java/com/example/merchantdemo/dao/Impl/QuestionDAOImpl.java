package com.example.merchantdemo.dao.Impl;

import com.example.merchantdemo.dao.QuestionDAO;
import com.example.merchantdemo.entity.Question;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionDAOImpl implements QuestionDAO {

    private EntityManager entityManager;

    @Autowired
    public QuestionDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Question addQuestions(Question theQuestion) {
        try {
            Question dbQuestion = entityManager.merge(theQuestion);
            return dbQuestion;
        }catch (Exception e){
            return null;
        }

    }
}
