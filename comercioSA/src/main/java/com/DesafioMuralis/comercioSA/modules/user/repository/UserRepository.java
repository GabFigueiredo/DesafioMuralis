package com.DesafioMuralis.comercioSA.modules.user.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DesafioMuralis.comercioSA.modules.user.model.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
}
