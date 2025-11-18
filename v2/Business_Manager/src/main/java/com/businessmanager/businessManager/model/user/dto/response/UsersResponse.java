package com.businessmanager.businessManager.model.user.dto.response;

public record UsersResponse(
        String fullname,
        String phone,
        String username,
        String email
) {
}
