package com.quizapp.core.interfaces.mappers;

import com.quizapp.core.models.Question;
import com.quizapp.web.dto.QuestionCreationDto;
import com.quizapp.web.dto.QuestionDto;

public interface QuestionMapper extends Mapper<Question> {
    Question FromCreationDto(QuestionCreationDto creationDto);

    QuestionDto ToDefaultDto(Question question);

}
