package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;
    private final PostController postController;



    @PostMapping("/ai/create/repository")
    public ResponseEntity<String> describeImage2(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("png_file") MultipartFile png_file,
                                                 @RequestParam("userId") String userId,
                                                 @RequestParam("uploadDate") String uploadDate) {
        try {
            String[] response = geminiService.getDescription(png_file).split(";");
            String description = response[0];
            String title = response[1];
            return postController.savePost(file,title,description,userId,uploadDate);
        } catch (IOException e) {
            return ResponseEntity.ok("failed");
        }
    }

}
