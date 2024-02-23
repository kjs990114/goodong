package com.kjs990114.goodong.repository;

import com.kjs990114.goodong.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity,Integer>{
    boolean existsByTitle(String title);
    List<PostEntity> findByUserId(String username);
    PostEntity findByPostId(Long postId);

}
