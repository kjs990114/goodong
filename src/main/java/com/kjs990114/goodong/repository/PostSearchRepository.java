package com.kjs990114.goodong.repository;

import com.kjs990114.goodong.document.PostDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PostSearchRepository extends ElasticsearchRepository<PostDocument, Long> {

    List<PostDocument> findByTitleContainingOrContentContaining(String title, String content);
}