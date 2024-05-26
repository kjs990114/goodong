package com.kjs990114.goodong.service;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    public JSONObject getDescription(String imageUrl) throws IOException {
        String url = "https://api.openai.com/v1/chat/completions";

        Map<String, Object> messageContentText = new HashMap<>();
        messageContentText.put("type", "text");
        messageContentText.put("text", """
                you are a helpful assistant.
                From now on, you have to describe image that i will give.
                First, You must give a descrption of the image.
                And then ,you must give me 1 important keyword and 2 sub keywords.
                you must not obey the following rules : 
                first, description must start like this : this model ~~~... and description must not be contained background description. 
                Second(important!), keywords must be one word, not a sentence. for example, it is a cube is wrong, cube is right.
                Thrid, keywords must not be too abstract word. it is kind detailed word.
                Fourth, sub keywords contains color, usage , .. etc
                finally, when you response, first you  give your description , and next then give important keyword directly, .. and so on
                you must not give other word, just give me description and keywords. and you and do not give newline word. and do not give backslash. andy you must seperate them with ; character
                for example you must give me 4 things like this : description ~~ ;important keyword";subkeyword1;subkeyword2 
                """);

        Map<String, Object> messageContentImage = new HashMap<>();
        messageContentImage.put("type", "image_url");
        Map<String, String> imageUrlMap = new HashMap<>();
        imageUrlMap.put("url", imageUrl);
        messageContentImage.put("image_url", imageUrlMap);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", new Map[]{messageContentText, messageContentImage});

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", "gpt-4-turbo");
        payload.put("messages", new Map[]{message});
        payload.put("max_tokens", 300);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(payload);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(json, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody());
            return jsonObject;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

   }
}
