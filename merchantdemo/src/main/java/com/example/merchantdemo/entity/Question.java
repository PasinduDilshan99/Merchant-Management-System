package com.example.merchantdemo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "q_id")
    private int qId;
    @Column(name = "q_1")
    private String q1;
    @Column(name = "q_2")
    private String q2;
    @Column(name = "q_3")
    private String q3;

    public Question() {
    }

    public Question(String q1, String q2, String q3) {
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
    }

    public int getqId() {
        return qId;
    }

    public void setqId(int qId) {
        this.qId = qId;
    }

    public String getQ1() {
        return q1;
    }

    public void setQ1(String q1) {
        this.q1 = q1;
    }

    public String getQ2() {
        return q2;
    }

    public void setQ2(String q2) {
        this.q2 = q2;
    }

    public String getQ3() {
        return q3;
    }

    public void setQ3(String q3) {
        this.q3 = q3;
    }

    @Override
    public String toString() {
        return "Question{" +
                "qId=" + qId +
                ", q1='" + q1 + '\'' +
                ", q2='" + q2 + '\'' +
                ", q3='" + q3 + '\'' +
                '}';
    }
}
