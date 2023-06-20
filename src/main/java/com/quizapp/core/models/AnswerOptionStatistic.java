package com.quizapp.core.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnswerOptionStatistic {

    public AnswerOption answerOption;
    public double selectedPercent;

}
