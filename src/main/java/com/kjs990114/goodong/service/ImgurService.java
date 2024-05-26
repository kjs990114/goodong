package com.kjs990114.goodong.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;

@Service
public class ImgurService {

    @Value("${imgur.client-id}")
    private String clientId;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String uploadImage(MultipartFile file) throws IOException {
        String url = "https://api.imgur.com/3/image";
        String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + clientId);
        headers.set("Content-Type", "application/json");

        String payload = String.format("{\"image\":\"%s\",\"type\":\"base64\"}", base64Image);
        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        JsonNode jsonResponse = objectMapper.readTree(response.getBody());
        return jsonResponse.path("data").path("link").asText();
    }
}
