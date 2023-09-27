package com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.ValidationError;
import jakarta.persistence.*;
import jakarta.validation.ValidationException;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Getter @Setter
public class RegisterUser {

    @Email(message = "Must be a valid email address.")
    @NotNull(message = "Email is a required field")
    private String email;

    @NotNull(message = "Firstname is a required field.")
    @Size(min = 5, message = "Firstname should be at least 4 characters long.")
    private String firstname;

    @NotNull(message = "Lastname is a required field.")
    @Size(min = 5, message = "Lastname should be at least 4 characters long.")
    private String lastname;

    private String image = "default.jpg";

    private String role = "user";

    @NotNull(message = "Password is a required field")
    @Size(min = 6, message = "Password should be at least 6 characters long")
    private String password;

    @NotNull(message = "Confirm password is a required field")
    @Size(min = 6, message = "Confirm password should be at least 6 characters long")
    private String confirmPassword;

    public static void checkPasswordMatch(String password, String confirmPassword){
        if(!Objects.equals(password, confirmPassword)){
            System.out.println("Passwords don't match.");
            Map<String, Object> errors = new HashMap<>();
            errors.put("confirmPassword", "Password and confirm password must match.");
            throw new ValidationError(errors);
        }
    }

    @Override
    public String toString(){
        return this.getEmail()+","+this.getFirstname()+" "+this.getLastname()+","+this.getPassword()+","+this.getConfirmPassword();
    }
}
