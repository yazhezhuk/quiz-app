package com.quizapp.core.interfaces.mappers;

import com.quizapp.core.models.Test;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestCreationDto;


public interface TestMapper extends Mapper<Test>{
    Test FromCreationDto(TestCreationDto creationDto);


    TestCreationDto ToDefaultDto(Test test);

    TestDto ToSessionDto(Test test);
}
