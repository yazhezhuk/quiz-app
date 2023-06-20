package com.quizapp.web.dto;

import com.quizapp.core.models.Question;
import lombok.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class TestDto {
    private int id;
    private String author;
    private long duration;
    private double grade;
    private String name;
    private String theme;
    private List<QuestionDto> questions;
    private List<AnswerOptionResultDto> answers;
}
