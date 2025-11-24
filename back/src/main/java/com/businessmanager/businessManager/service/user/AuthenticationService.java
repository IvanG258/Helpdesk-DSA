package com.businessmanager.businessManager.service.user;

import com.businessmanager.businessManager.exceptions.CustomDisabledException;
import com.businessmanager.businessManager.exceptions.DuplicatedEntitiesExceptions;
import com.businessmanager.businessManager.exceptions.UserExistsException;
import com.businessmanager.businessManager.model.user.User;
import com.businessmanager.businessManager.model.user.dto.request.LoginRequest;
import com.businessmanager.businessManager.model.user.dto.request.RegisterRequestDTO;
import com.businessmanager.businessManager.model.user.dto.request.UpdateUser;
import com.businessmanager.businessManager.model.user.dto.response.AuthenticationResponse;
import com.businessmanager.businessManager.model.user.dto.response.LoginResponse;
import com.businessmanager.businessManager.model.user.dto.response.UpdateUserResponse;
import com.businessmanager.businessManager.model.user.dto.response.UsersResponse;
import com.businessmanager.businessManager.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new UserExistsException("Este email ja foi registado no sistema, tente outro");
        }

        if (userRepository.existsByPhone(request.phone())) {
            throw new UserExistsException("Este numero ja foi registado no sistema, tente registar outro");
        }

        User user = new User();
        user.setFullName(request.fullName());
        user.setPhone(request.phone());
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        user.setCreatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthenticationResponse(
                accessToken,
                refreshToken,
                "Usuario criado com sucesso!");
    }

    public LoginResponse authenticate(LoginRequest request) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(
                    request.username(),
                    request.password());
            var user = userRepository.findByUsername(request.username()).orElseThrow();
            var auth = this.authenticationManager.authenticate(usernamePassword);
            User usuario = (User) auth.getPrincipal();
            String accessToken = jwtService.generateToken(usuario);
            var refreshToken = jwtService.generateRefreshToken(user);
            Long userId = usuario.getId();

            return new LoginResponse(
                    accessToken,
                    refreshToken,
                    userId);

        } catch (CustomDisabledException e) {
            throw new CustomDisabledException(e.getMessage());
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Usuário ou senha inválidos!");
        }
    }

    public String alterarSenha(String username, String senhaAtual, String novaSenha) {

        if (senhaAtual.equals(novaSenha)) {
            throw new BadCredentialsException("A nova senha deve ser diferente da senha atual");
        }

        if (novaSenha.length() < 8) {
            throw new BadCredentialsException("A senha deve ter no mínimo 8 caracteres");
        }

        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!passwordEncoder.matches(senhaAtual, usuario.getPassword())) {
            throw new BadCredentialsException("Senha atual incorreta");
        }
        usuario.setPassword(passwordEncoder.encode(novaSenha));
        userRepository.save(usuario);

        String assunto = "Alteração de Senha Confirmada";
        String corpoEmail = "Olá " + usuario.getFullName() + ",\n\n"
                + "Sua senha foi alterada com sucesso em " + LocalDateTime.now() + ".\n\n"
                + "Caso não tenha sido você quem realizou esta alteração, entre em contato imediatamente com o suporte.\n\n"
                + "Atenciosamente,\nEquipe de Suporte";
        // emailService.send(usuario.getEmail(), assunto, corpoEmail);
        return "Senha alterada com sucesso";
    }

    public UpdateUserResponse updateUser(Long id, UpdateUser dto) {
        User usuario = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com ID " + id + " não encontrado."));
        userRepository.findByEmail(dto.email()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new DuplicatedEntitiesExceptions("Já existe um usuário com este e-mail.");
            }
        });
        userRepository.findByUsername(dto.username()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new DuplicatedEntitiesExceptions("Já existe um usuário com este username.");
            }
        });
        usuario.setFullName(dto.fullName());
        usuario.setEmail(dto.email());
        usuario.setUsername(dto.username());
        usuario.setPhone(dto.phone());
        usuario = userRepository.save(usuario);
        return new UpdateUserResponse(
                "Usuario atualizado com sucesso");
    }

    public String recoverPassword(String email) {
        User usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Email inválido!"));

        String novaSenha = gerarSenhaAleatoria();
        usuario.setPassword(passwordEncoder.encode(novaSenha));
        userRepository.save(usuario);

        String assunto = "Recuperação de Senha - Sistema de Segurança";
        String corpoEmail = "Olá " + usuario.getFullName() + ",\n\n"
                + "Sua nova senha é: " + novaSenha + "\n"
                + "Por favor, altere-a após o login.\n\n"
                + "Atenciosamente,\nEquipe de Suporte";

        // emailService.send(usuario.getEmail(), assunto, corpoEmail);

        return "Uma nova senha foi enviada para o seu e-mail cadastrado.";
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Page<UsersResponse> listUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable)
                .map(user -> new UsersResponse(
                        user.getFullName(),
                        user.getPhone(),
                        user.getUsername(),
                        user.getEmail()));
    }

    public String refreshAccessToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!jwtService.isValidRefreshToken(refreshToken, user)) {
            throw new BadCredentialsException("Refresh token inválido ou expirado");
        }

        String newAccessToken = jwtService.generateAccessToken(user);

        return newAccessToken;
    }

    private String gerarSenhaAleatoria() {
        int length = 10;
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder senha = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            senha.append(caracteres.charAt(random.nextInt(caracteres.length())));
        }
        return senha.toString();
    }

}
