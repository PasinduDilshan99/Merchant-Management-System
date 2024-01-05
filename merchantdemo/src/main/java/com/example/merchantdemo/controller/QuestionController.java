package com.example.merchantdemo.controller;

import com.example.merchantdemo.entity.Question;
import com.example.merchantdemo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PutMapping("/{theUserName}")
    public ResponseEntity<Question> addQuestions(@PathVariable String theUserName, @RequestBody Question theQuestion){
        return questionService.addQuestions(theQuestion , theUserName);
    }
}
