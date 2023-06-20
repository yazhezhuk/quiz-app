package com.quizapp.web.controllers;

import com.quizapp.core.interfaces.mappers.TestMapper;
import com.quizapp.core.interfaces.repository.TestRepository;
import com.quizapp.core.interfaces.repository.UserRepository;
import com.quizapp.core.interfaces.services.domain.TestBuilderService;
import com.quizapp.core.interfaces.services.domain.TestingService;
import com.quizapp.core.models.user.AppUser;
import com.quizapp.core.models.user.Role;
import com.quizapp.web.dto.TestDto;
import com.quizapp.web.dto.TestCreationDto;
import com.quizapp.web.dto.TestViewDto;
import com.quizapp.web.dto.auth.TestAuthCodeDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/test")
@AllArgsConstructor
public class TestController {
    private final TestRepository testRepository;
    private final TestMapper testMapper;


    private final UserRepository userRepository;
    private final TestBuilderService testBuilderService;
    private final TestingService testingService;

    @GetMapping("/")
    public ResponseEntity<List<TestCreationDto>> getTests() {
        return new ResponseEntity<>(
                testRepository.findAll()
                .stream()
                .map(testMapper::ToDefaultDto)
                .toList(), HttpStatus.OK);
    }

    @GetMapping("/user/")
    public ResponseEntity<List<TestViewDto>> getUserCreatedTests() {
        var user = retrieveUser();
        return ResponseEntity.ok(user.getCreatedTests().stream()
                .map(t ->
                    TestViewDto.builder()
                            .id(t.getId())
                            .theme(t.getTheme())
                            .name(t.getName()).build()
                ).toList());
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
        }
        catch (Exception e){

        }
    }

    @PostMapping("/create/")
    public ResponseEntity create(@RequestBody TestCreationDto testDto){
            var user = retrieveUser();
            var userEntity = userRepository.findByEmail(user.getEmail()).get();

            var test = testMapper.FromCreationDto(testDto);
            var connectionString = testBuilderService.commitTest(userEntity,test);
            return ResponseEntity.ok(connectionString);
    }

    @PostMapping("/end/{testId}")
    public ResponseEntity end(@PathVariable int testId){
        try {
            var user = retrieveUser();
            testingService.endTest(user.getId(), testId);

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/result/{testId}")
    public ResponseEntity result(@PathVariable int testId){
        try {
            var user = retrieveUser();
            if (user.getRole() == Role.USER)
                return ResponseEntity.ok(testingService.getUserResults(user.getId(),testId));

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }


}
