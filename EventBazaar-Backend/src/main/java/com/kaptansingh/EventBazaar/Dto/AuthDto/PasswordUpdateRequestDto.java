package com.kaptansingh.EventBazaar.Dto.AuthDto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordUpdateRequestDto {

    @Size(min = 8, message = "oldPassword must be at least 8 characters long")
    private String oldPassword;

    @Size(min = 8, message = "newPassword must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "New password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    private String newPassword;

    @Size(min = 8, message = "confirmPassword must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Confirm password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    private String confirmPassword;
}
