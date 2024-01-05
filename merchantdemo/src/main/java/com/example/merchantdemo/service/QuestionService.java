package com.example.merchantdemo.service;

import com.example.merchantdemo.entity.Question;
import org.springframework.http.ResponseEntity;

public interface QuestionService {
    ResponseEntity<Question> addQuestions(Question theQuestion, String theUserName);
}
