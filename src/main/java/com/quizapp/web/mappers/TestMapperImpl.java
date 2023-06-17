package com.quizapp.web.mappers;

import com.quizapp.core.interfaces.mappers.QuestionMapper;
import com.quizapp.core.interfaces.mappers.TestMapper;
import com.quizapp.core.models.Test;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestViewDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TestMapperImpl implements TestMapper {

    private final QuestionMapper questionMapper;

    public Test FromCreationDto(TestViewDto testDto) {
        return null;
    }


    @Override
    public TestViewDto ToDefaultDto(Test entity) {
        return new TestViewDto(entity.getId(), entity.getName(), entity.getTheme());
    }

    @Override
    public TestDto ToSessionDto(Test test) {
        return new TestDto(test.getDuration(),
                test.getName(),
                test.getTheme(),
                test.getQuestions().stream()
                        .map(questionMapper::ToDefaultDto)
                        .toList());
    }
}
