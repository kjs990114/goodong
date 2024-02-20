package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.dto.PostDTO;
import com.kjs990114.goodong.entity.PostEntity;
import com.kjs990114.goodong.jwt.JWTUtil;
import com.kjs990114.goodong.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/repository")
public class PostController {

    private final PostService postService;
    private final JWTUtil jwtUtil;
    @PostMapping("/savepost")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> savePost(@RequestBody PostDTO postDTO){
        try {
            postService.savePost(postDTO);
            return ResponseEntity.ok("success");
        }catch (Exception e){
            return ResponseEntity.ok("failed");
        }
    }

    @GetMapping("/showpost")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<PostEntity>> showPost(@RequestHeader("Authorization") String jwtToken) {
        String token = jwtToken.split(" ")[1];
        String userId = jwtUtil.getUsername(token);
        List<PostEntity> post = postService.getPostByUserId(userId);
        return ResponseEntity.ok(post);
    }
}
