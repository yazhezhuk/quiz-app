package com.quizapp.web.controllers;

import com.quizapp.core.interfaces.mappers.TestMapper;
import com.quizapp.core.interfaces.repository.TestRepository;
import com.quizapp.core.interfaces.services.domain.TestBuilderService;
import com.quizapp.core.interfaces.services.domain.TestingService;
import com.quizapp.core.models.user.AppUser;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestViewDto;
import com.quizapp.web.dto.auth.TestAuthCodeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/test")
public class TestController {
    private final TestRepository testRepository;
    private final TestMapper testMapper;



    private final TestBuilderService testBuilderService;
    private final TestingService testingService;

    @Autowired
    public TestController(TestRepository testRepository, TestMapper testMapper, TestBuilderService testBuilderService, TestingService testingService){
        this.testRepository = testRepository;
        this.testMapper = testMapper;
        this.testBuilderService = testBuilderService;
        this.testingService = testingService;
    }

    @GetMapping("/")
    public ResponseEntity<List<TestViewDto>> getTests() {
        return new ResponseEntity<>(
                testRepository.findAll()
                .stream()
                .map(testMapper::ToDefaultDto)
                .toList(), HttpStatus.OK);
    }

    private AppUser retrieveUser(){
        return (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping("/start/")
    public ResponseEntity<TestDto> startTest(@RequestBody TestAuthCodeDto authenticator) {
        try {
            var user = retrieveUser();
            var test = testRepository.getTestByAuthCode(authenticator.getAuthenticator())
                    .orElseThrow(() ->new IllegalArgumentException("Test nof found."));
            testingService.enterTest(user.getId(),test.getId());
            return ResponseEntity.ok(testMapper.ToSessionDto(test));
        }
        catch (Exception e)
        {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/answer/{questionId}/with/{optionId}")
    public void answer(@PathVariable int questionId,
                       @PathVariable int optionId
                       ){
        try {
            var user = retrieveUser();
            testingService.answerQuestion(user.getId(), questionId, optionId);
        }catch (Exception e){

        }
    }

    @PostMapping("/end/{testId}")
    public ResponseEntity answer(@PathVariable int testId){
        try {
            var user = retrieveUser();
            testingService.endTest(user.getId(), testId);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }



}
