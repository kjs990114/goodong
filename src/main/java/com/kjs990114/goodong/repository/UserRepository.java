package com.kjs990114.goodong.repository;

import com.kjs990114.goodong.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer>
{
    boolean existsByUsername(String username);
    UserEntity findByUsername(String username);
}
