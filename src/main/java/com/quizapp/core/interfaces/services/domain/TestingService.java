package com.quizapp.core.interfaces.services.domain;


import com.quizapp.core.models.Test;
import com.quizapp.web.dto.AnswerOptionResultDto;
import com.quizapp.web.dto.TestDto;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface TestingService {

    TestDto enterTest(int userId,int testId);
    TestDto getUserResults(int userId, int testId);
    void ensureUserParticipation(int userId,int testId);
    void answerQuestion(int userId,int questionId,int answerOptionId);
    void endTest(int userId,int testId);
}
