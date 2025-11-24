package com.businessmanager.businessManager.model.user.dto.response;

public record AuthenticationResponse(
        String accessToken,
        String refreshToken,
        String message
) {
}
