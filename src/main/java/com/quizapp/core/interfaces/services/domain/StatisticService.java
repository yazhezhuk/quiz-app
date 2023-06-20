package com.quizapp.core.interfaces.services.domain;

import com.quizapp.core.models.QuestionStatistic;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public interface StatisticService {
    List<QuestionStatistic> getTestStatistic(int testId);
}
