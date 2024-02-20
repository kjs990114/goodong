package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.dto.UserDTO;
import com.kjs990114.goodong.service.RegisterUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegisterController {

    private final RegisterUserService registerUserService;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> saveUser(@RequestBody UserDTO user){
        try {
            registerUserService.registerUser(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok("Email already exists!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred during registration.");
        }
    }


}
