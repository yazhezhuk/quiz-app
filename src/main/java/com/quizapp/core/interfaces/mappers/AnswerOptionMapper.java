package com.quizapp.core.interfaces.mappers;

import com.quizapp.core.models.AnswerOption;
import com.quizapp.core.models.Question;
import com.quizapp.web.dto.AnswerOptionCreationDto;
import com.quizapp.web.dto.AnswerOptionViewDto;
import com.quizapp.web.dto.QuestionCreationDto;
import com.quizapp.web.dto.QuestionDto;

public interface AnswerOptionMapper extends Mapper<AnswerOption>{
    AnswerOption FromCreationDto(AnswerOptionCreationDto creationDto);

    AnswerOptionViewDto ToViewDto(AnswerOption answerOption);
}
