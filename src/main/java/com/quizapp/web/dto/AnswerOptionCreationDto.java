package com.quizapp.web.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
public class AnswerOptionCreationDto {
    private String Text;
      private boolean isCorrect;
    private double points;
}
