package com.kjs990114.goodong.dto;

import com.kjs990114.goodong.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String username;
    private String password;
    private String role;
    public UserEntity toEntity(){
        return UserEntity.builder()
                .username(this.username)
                .password(this.password)
                .role(this.role)
                .build();
    }
}
