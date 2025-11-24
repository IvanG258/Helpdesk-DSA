package com.businessmanager.businessManager.repository.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.businessmanager.businessManager.model.user.User;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByphone(String phone);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);


    boolean existsByPhone(@NotBlank(message = "O número de telefone não pode estar vazio") @Pattern(
                regexp = "\\+258(8[726345])\\d{6}$",
                message = "O número de telefone deve estar no formato +2588X... com prefixos válidos: 87, 86, 82, 83, 84 ou 85"
        ) String phone);
}