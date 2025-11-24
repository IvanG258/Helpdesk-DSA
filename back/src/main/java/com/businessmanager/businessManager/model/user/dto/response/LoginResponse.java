package com.businessmanager.businessManager.model.user.dto.response;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        long userId
) {
}
