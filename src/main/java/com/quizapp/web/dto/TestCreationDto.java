package com.quizapp.web.dto;

import lombok.*;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public final class TestCreationDto {
    private String name;
    private String theme;
    private List<QuestionCreationDto> questions;
}
