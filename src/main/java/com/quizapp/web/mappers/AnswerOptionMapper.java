package com.quizapp.web.mappers;

import com.quizapp.core.interfaces.mappers.Mapper;
import com.quizapp.core.models.AnswerOption;
import com.quizapp.web.dto.AnswerOptionCreationDto;
import com.quizapp.web.dto.AnswerOptionViewDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AnswerOptionMapper implements com.quizapp.core.interfaces.mappers.AnswerOptionMapper {

    public AnswerOption FromCreationDto(AnswerOptionCreationDto answerOptionDto){
        //return new AnswerOption(answerOptionDto.getText(),answerOptionDto.getPoints());
        return null;
    }

    @Override
    public AnswerOptionViewDto ToViewDto(AnswerOption answerOption) {
        return new AnswerOptionViewDto(answerOption.getId(), answerOption.getText());
    }
}
