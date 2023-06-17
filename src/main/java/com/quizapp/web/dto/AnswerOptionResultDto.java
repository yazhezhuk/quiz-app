package com.quizapp.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerOptionResultDto extends AnswerOptionViewDto{
    private boolean isRight;
    private boolean isUserSelected;

    public AnswerOptionResultDto(int id, String text) {
        super(id, text);
    }
}
