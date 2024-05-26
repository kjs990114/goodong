package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.service.ImgurService;
import com.kjs990114.goodong.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Arrays;

@RestController
@RequiredArgsConstructor
public class OpenAIController {

    private final OpenAIService openAIService;
    private final PostController postController;
    private final ImgurService imgurService;
    @PostMapping("/ai/test")
    public ResponseEntity<String> describeImage(@RequestParam("file") MultipartFile file,
                                                @RequestParam("png_file") MultipartFile png_file,
                                            @RequestParam("userId") String userId,
                                            @RequestParam("uploadDate") String uploadDate) {
        try {
            String url = imgurService.uploadImage(png_file);
            JSONObject jsonObject = openAIService.getDescription(url);
            JSONArray choicesArray = (JSONArray) jsonObject.get("choices");
            JSONObject firstChoice = (JSONObject) choicesArray.get(0);
            JSONObject message = (JSONObject) firstChoice.get("message");
            String content = (String) message.get("content");
            String[] contentArray = content.split(";");
            String description = contentArray[0];
            String title = contentArray[1];
            System.out.println(Arrays.toString(contentArray));

            return postController.savePost(file,title,description,userId,uploadDate);
        } catch (IOException e) {
            return ResponseEntity.ok("failed");
        }
    }
}
