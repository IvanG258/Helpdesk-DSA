package com.businessmanager.businessManager.controller.user;

import com.businessmanager.businessManager.model.user.dto.request.LoginRequest;
import com.businessmanager.businessManager.model.user.dto.request.RegisterRequestDTO;
import com.businessmanager.businessManager.model.user.dto.response.AuthenticationResponse;
import com.businessmanager.businessManager.model.user.dto.response.LoginResponse;
import com.businessmanager.businessManager.model.user.dto.response.UsersResponse;
import com.businessmanager.businessManager.service.user.AuthenticationService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequestDTO usuario) {
        return ResponseEntity.ok(authenticationService.register(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest usuario) {
        return ResponseEntity.ok(authenticationService.authenticate(usuario));
    }

    @PostMapping("/repassword")
    public ResponseEntity<String> recoverPassword(@PathVariable String email) {
        return ResponseEntity.ok(authenticationService.recoverPassword(email));
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UsersResponse>> listUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UsersResponse> users = authenticationService.listUsers(page, size);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request) {
        String refreshToken = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                .filter(c -> c.getName().equals("refreshToken"))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Refresh token não encontrado"));
        }

        String newAccessToken = authenticationService.refreshAccessToken(refreshToken);

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); 
        cookie.setPath("/");
        cookie.setMaxAge(0); 
        response.addCookie(cookie);

        return ResponseEntity.noContent().build(); 
    }

}
