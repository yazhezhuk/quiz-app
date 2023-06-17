package com.quizapp.core.interfaces.mappers;

import com.quizapp.core.models.Test;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestViewDto;


public interface TestMapper extends Mapper<Test>{
    Test FromCreationDto(TestViewDto creationDto);

    TestViewDto ToDefaultDto(Test test);

    TestDto ToSessionDto(Test test);
}
