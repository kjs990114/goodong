package com.kjs990114.goodong.controller;

import com.kjs990114.goodong.dto.PostDTO;
import com.kjs990114.goodong.entity.PostEntity;
import com.kjs990114.goodong.jwt.JWTUtil;
import com.kjs990114.goodong.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/repository")
public class PostController {

    private final PostService postService;

    @PostMapping("/savepost")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> savePost(@RequestParam("file") MultipartFile file,
                                           @RequestParam("title") String title,
                                           @RequestParam("content") String content,
                                           @RequestParam("userId") String userId,
                                           @RequestParam("uploadDate") String uploadDate)

    {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            Date parsedDate = dateFormat.parse(uploadDate);
            Timestamp timestamp = new Timestamp(parsedDate.getTime());

            String fileDestURL = "/Users/keemjoonsung/IdeaProjects/goodong/src/main/resources/static/models/" + "1.gltf";
            file.transferTo(new File(fileDestURL));
            String fileUrl = "http://localhost:8000/models/1.gltf";
            PostDTO postDTO = new PostDTO(title, content, userId, timestamp ,fileUrl);

            postService.savePost(postDTO);

            System.out.println("file = " + file);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.ok("failed");
        }
    }


    @GetMapping("/showpost")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<PostEntity>> showPostAll( @RequestParam("username") String username) {
        List<PostEntity> post = postService.getPostByUserId(username);
        return ResponseEntity.ok(post);
    }


    @GetMapping("/showpostByPostId")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<PostEntity> showPostByPostId(@RequestParam("postId") String postId){
        Long id = Long.parseLong(postId);
        System.out.println("id = " + id);
        return ResponseEntity.ok(postService.getPostByPostId(id));
    }
}
