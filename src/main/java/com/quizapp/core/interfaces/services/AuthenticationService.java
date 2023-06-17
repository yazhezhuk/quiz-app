package com.quizapp.core.interfaces.services;

public interface AuthenticationService {
    void signUp(String firstname,String lastname,String email,String password);
    String signIn(String email,String password);
}
