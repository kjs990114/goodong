package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final JWTUtil jwtUtil;

    @GetMapping("/expired")
    public ResponseEntity<Boolean> isJWTExpired(@RequestHeader("Authorization") String jwtToken){
        String token = jwtToken.split(" ")[1];
        boolean isTokenExpired = jwtUtil.isExpired(token);
        System.out.println("isTokenExpired = " + isTokenExpired);
        return ResponseEntity.ok(isTokenExpired);
    }
}
