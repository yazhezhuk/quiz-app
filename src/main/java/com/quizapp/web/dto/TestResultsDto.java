package com.quizapp.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class TestResultsDto {
    private String name;
    private String theme;
    private List<QuestionResultDto> questions;
}
