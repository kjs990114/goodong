package com.kjs990114.goodong.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HomeController {
    @GetMapping("/test")
    public String home() {
        return "";
    }
}
