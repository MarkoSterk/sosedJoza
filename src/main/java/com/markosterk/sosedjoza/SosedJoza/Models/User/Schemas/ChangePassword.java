package com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChangePassword {
    @NotNull(message="Current password is a required field")
    private String currentPassword;
    @NotNull(message="New password if a required field.")
    @Size(min = 6, message = "New password should be at least 6 characters long")
    private String password;
    @NotNull(message="Confirm password is a required field.")
    @Size(min = 6, message = "Confirm password should be at least 6 characters long")
    private String confirmPassword;
}
