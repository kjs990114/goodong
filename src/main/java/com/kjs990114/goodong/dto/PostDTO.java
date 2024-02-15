package com.kjs990114.goodong.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    private String title;
    private String content;
    private String userId;
    private Timestamp uploadDate;
}
