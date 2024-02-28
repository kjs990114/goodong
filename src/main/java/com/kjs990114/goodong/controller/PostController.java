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
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


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
            String uuid = UUID.randomUUID().toString();
            String fileName = file.getOriginalFilename();
            String fileDir = "/Users/keemjoonsung/IdeaProjects/goodong/src/main/resources/static/models/" + uuid;

            Path dir = Paths.get(fileDir);
            Files.createDirectory(dir);
            File newFile = new File(dir.toFile(), fileName);
            file.transferTo(newFile);

            if(fileName.endsWith(".zip")){
                fileName = extractZipFile(newFile, dir.toFile());
            }

            String fileUrl = "http://localhost:8000/models/"+ uuid+ "/" +fileName;
            PostDTO postDTO = new PostDTO(title, content, userId, timestamp ,fileUrl);

            postService.savePost(postDTO);

            System.out.println("file = " + file);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
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


    public String extractZipFile(File zipFile, File destDir) throws IOException {
        byte[] buffer = new byte[1024];
        String gltfFileName = null;
        try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(zipFile.toPath()))) {
            ZipEntry zipEntry;
            while ((zipEntry = zis.getNextEntry()) != null) {
                File newFile = new File(destDir, zipEntry.getName());
                if (zipEntry.isDirectory()) {
                    newFile.mkdirs();
                } else {
                    new File(newFile.getParent()).mkdirs();
                    try (FileOutputStream fos = new FileOutputStream(newFile)) {
                        int len;
                        while ((len = zis.read(buffer)) > 0) {
                            fos.write(buffer, 0, len);
                        }
                    }
                    System.out.println("zipEntry.getName() = " + zipEntry.getName());
                    if (!newFile.getName().startsWith("._") && newFile.getName().toLowerCase().endsWith(".gltf")) {
                        gltfFileName = newFile.getName();
                    }
                }
                zis.closeEntry();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return gltfFileName;
    }

}
