package com.quizapp.web.mappers;


import com.quizapp.core.interfaces.mappers.QuestionMapper;
import com.quizapp.core.interfaces.mappers.TestMapper;
import com.quizapp.core.models.Question;
import com.quizapp.web.dto.QuestionCreationDto;
import com.quizapp.web.dto.QuestionDto;
import com.quizapp.web.dto.TestViewDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class QuestionMapperImpl implements QuestionMapper {
    private final AnswerOptionMapper answerOptionMapper;
    @Override
    public Question FromCreationDto(QuestionCreationDto creationDto) {
        return null;
    }

    @Override
    public QuestionDto ToDefaultDto(Question question) {

        return new QuestionDto(question.getId(), question.getText(),
                question.getAnswerOptions().stream().map(answerOptionMapper::ToViewDto).toList());
    }
}
