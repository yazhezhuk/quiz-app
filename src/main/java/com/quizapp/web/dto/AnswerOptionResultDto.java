package com.quizapp.web.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AnswerOptionResultDto extends AnswerOptionViewDto{
    private boolean isRight;
    private boolean isUserSelected;

}
