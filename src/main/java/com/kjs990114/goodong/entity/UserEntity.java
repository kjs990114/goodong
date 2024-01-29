package com.kjs990114.goodong.entity;

import com.kjs990114.goodong.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor //파라미터가 없는 기본 생성자 생성
@AllArgsConstructor
@Table(name = "user_info")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String username;

    private String password;

    private String role;

    public UserDTO toDTO(){
        return UserDTO.builder()
                .username(username)
                .password(password)
                .build();
    }
}

