package com.kjs990114.goodong.service;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.messages.Media;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatClient;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatOptions;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final VertexAiGeminiChatClient geminiClient;

    public String getDescription(MultipartFile png_file) throws IOException {
        byte[] imgBytes = png_file.getBytes();
        UserMessage multiModalUserMessage = new UserMessage("""
                you are a helpful assistant.
                From now on, you have to describe image of 3D model that i will give.
                you have to pretend like you are a owner of the 3D model and explain it as you are a maker of this 3D model.
                First, You must give a descrption of the image.
                And then ,you must give me 1 important keyword and 2 sub keywords.
                you must not obey the following rules :
                first, description must start like this : this model ~~~... and description must not be contained background description.
                Second(important!), keywords must be one word, not a sentence. for example, it is a cube is wrong, cube is right.
                Third, keywords must not be too abstract word. it is kind detailed word.
                Fourth, sub keywords contains color, usage , .. etc
                finally, when you response, first you  give your description , and next then give important keyword directly, .. and so on
                you must not give other word, just give me description and keywords. and you and do not give newline word. and do not give backslash. andy you must seperate them with ; character
                for example you must give me 4 things like this : description ~~ ;important keyword";subkeyword1;subkeyword2
                """,
                List.of(new Media(MimeTypeUtils.IMAGE_PNG, imgBytes)));

                ChatResponse multiModalResponse = geminiClient.call(new Prompt(List.of(multiModalUserMessage),
                VertexAiGeminiChatOptions.builder().withModel("gemini-pro-vision").build()));

        return multiModalResponse.getResult().getOutput().getContent();

    }
}
