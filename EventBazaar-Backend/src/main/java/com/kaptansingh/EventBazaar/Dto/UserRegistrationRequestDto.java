package com.kaptansingh.EventBazaar.Dto;

import com.kaptansingh.EventBazaar.Enum.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class UserRegistrationRequestDto {
    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid Email Format")
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    private String password;

    @NotEmpty(message = "Roles are required")
    @Size(min = 1, message = "At least one role is required")
    private Set<Role> roles;

    private String phone;
}
