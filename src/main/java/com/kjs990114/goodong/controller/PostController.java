package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.dto.PostDTO;
import com.kjs990114.goodong.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/savepost")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> savePost(@RequestBody PostDTO postDTO){
        try {
            postService.post(postDTO);
            return ResponseEntity.ok("success");
        }catch (Exception e){
            return ResponseEntity.ok("failed");
        }
    }

}
