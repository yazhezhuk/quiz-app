package com.quizapp.core.services;

import com.quizapp.core.interfaces.repository.AnswerRepository;
import com.quizapp.core.interfaces.repository.QuestionRepository;
import com.quizapp.core.interfaces.repository.TestRepository;
import com.quizapp.core.interfaces.repository.TestingSessionRepository;
import com.quizapp.core.interfaces.services.domain.StatisticService;
import com.quizapp.core.models.AnswerOptionStatistic;
import com.quizapp.core.models.Question;
import com.quizapp.core.models.QuestionStatistic;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService {


    private final TestingSessionRepository sessionRepository;
    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;
    private final TestRepository testRepository;

    @Override
    public List<QuestionStatistic> getTestStatistic(int testId) {
        var test = testRepository.findById(testId).orElseThrow(() -> new IllegalArgumentException(""));
        var answers = test.getAnswers();
        var questions = test.getQuestions();


        return questions.stream().map(q -> {
            var stat = new QuestionStatistic();
            stat.setQuestion(q);
            stat.setAnswerOptionsStatistic(new ArrayList<>());
             q.getAnswerOptions()
                     .forEach(ao ->
                         stat.getAnswerOptionsStatistic()
                                 .add(new AnswerOptionStatistic(ao,ao.getAnswers().size()))
                     );
            return stat;
        }).toList();
    }
}
