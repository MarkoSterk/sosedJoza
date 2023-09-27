package com.markosterk.sosedjoza.SosedJoza.Repos.User;

import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

