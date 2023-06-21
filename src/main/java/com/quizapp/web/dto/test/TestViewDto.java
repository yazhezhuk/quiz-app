package com.quizapp.web.dto.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestViewDto {
    private int id;
    private String name;
    private String theme;
    private double maxGrade;
    private List<TestResultViewDto> results;
}
