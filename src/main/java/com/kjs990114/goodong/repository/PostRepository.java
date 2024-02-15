package com.kjs990114.goodong.repository;

import com.kjs990114.goodong.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity,Integer>{
    boolean existsByTitle(String title);
}
