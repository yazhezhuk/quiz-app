package com.quizapp.web.dto;

import com.quizapp.core.models.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class TestDto {
    private String author;
    private long duration;
    private double grade;
    private String name;
    private String theme;
    private List<QuestionDto> questions;
    private List<AnswerOptionResultDto> answers;
}
