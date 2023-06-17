package com.quizapp.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.Immutable;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

public class QuestionCreationDto {
    @NotNull
    public String Theme;

    @NotNull
    public String Name;

    
    @Min(value = 0, message = "Points cannot be negative.")
    public int MaxPoints;

    @Immutable
    @Nullable
    public List<AnswerOptionViewDto> AnswersOptions;


    public QuestionCreationDto(@NotNull String theme,
                               @NotNull String name,
                               int maxPoints,
                               @Nullable List<AnswerOptionViewDto> answerOptionDtos) {
        Theme = theme;
        Name = name;
        MaxPoints = maxPoints;
        AnswersOptions = answerOptionDtos;

    }
}
