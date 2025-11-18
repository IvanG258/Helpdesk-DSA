package com.businessmanager.businessManager.model.user.dto.request;

public record LoginRequest(
        String username,
        String password
) {
}
