package com.quizapp.web.mappers;

import com.quizapp.core.interfaces.mappers.QuestionMapper;
import com.quizapp.core.interfaces.mappers.TestMapper;
import com.quizapp.core.models.Test;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestCreationDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@AllArgsConstructor
public class TestMapperImpl implements TestMapper {

    private final QuestionMapper questionMapper;

    public Test FromCreationDto(TestCreationDto testDto) {
        return Test.builder()
                .name(testDto.getName())
                .authCode(UUID.randomUUID().toString())
                .questions(testDto.getQuestions()
                        .stream()
                        .map(questionMapper::FromCreationDto).toList()
                ).build();
    }

    @Override
    public TestCreationDto ToDefaultDto(Test entity) {
        return TestCreationDto.builder().build();
    }

    @Override
    public TestDto ToSessionDto(Test test) {
        return TestDto.builder()
                .id(test.getId())
                .duration(test.getDuration())
                .name(test.getName())
                .author("ya")
                .questions(
                        test.getQuestions().stream()
                                .map(questionMapper::ToDefaultDto)
                                .toList())
                .build();
    }
}
