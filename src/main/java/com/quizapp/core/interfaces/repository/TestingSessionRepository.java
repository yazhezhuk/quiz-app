package com.quizapp.core.interfaces.repository;

import com.quizapp.core.models.TestingSession;
import com.quizapp.core.models.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TestingSessionRepository extends JpaRepository<TestingSession, Integer> {
    Optional<TestingSession> getByAppUser_IdAndTest_Id(int userId,int testId);
}
