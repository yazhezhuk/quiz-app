package com.quizapp.core.services;

import com.quizapp.core.interfaces.repository.QuestionRepository;
import com.quizapp.core.interfaces.repository.UserRepository;
import com.quizapp.core.interfaces.services.domain.TestBuilderService;
import com.quizapp.core.interfaces.repository.TestRepository;
import com.quizapp.core.models.AnswerOption;
import com.quizapp.core.models.Question;
import com.quizapp.core.models.Test;
import com.quizapp.core.models.TestState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestBuilderServiceImpl implements TestBuilderService {

    private final QuestionRepository questionRepository;

    private final TestRepository testRepository;
    private final UserRepository userRepository;

    @Autowired
    public TestBuilderServiceImpl(QuestionRepository questionRepository, TestRepository testRepository, UserRepository userRepository){
        this.questionRepository = questionRepository;
        this.testRepository = testRepository;
        this.userRepository = userRepository;
    }
    @Override
    public void addQuestion(int testId, Question question) {
        var test = testRepository.findById(testId).orElseThrow(() -> new IllegalArgumentException("Test not found"));

        test.addQuestion(question);
    }

    public void addAnswerOption(int questionId, AnswerOption answerOption){
        var question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Question not found."));

        question.addAnswerToPoll(answerOption);
    }


    @Override
    public void removeUser(int testId, int userId) {

    }

    @Override
    public void saveTest(Test test) {

    }
}
