package com.quizapp.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class UserDto {
    @Getter
    private int id;
    @Getter
    private String name;
}
