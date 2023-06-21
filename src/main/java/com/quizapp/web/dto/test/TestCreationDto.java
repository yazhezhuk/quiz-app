package com.quizapp.web.dto.test;

import com.quizapp.web.dto.question.QuestionCreationDto;
import lombok.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public final class TestCreationDto {
    private String name;
    private String theme;
    private boolean isGraded;
    private boolean isForm;
    private List<QuestionCreationDto> questions;
}
