package com.kjs990114.goodong.service;


import com.kjs990114.goodong.dto.PostDTO;
import com.kjs990114.goodong.entity.PostEntity;
import com.kjs990114.goodong.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public void post(PostDTO post) throws Exception {

        if(postRepository.existsByTitle(post.getTitle())){
            throw new Exception("Title already Exists!");
        }
        PostEntity postEntity = new PostEntity();

        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setUserId(post.getUserId());
        postEntity.setUploadDate(post.getUploadDate());

        postRepository.save(postEntity);
    }
}
