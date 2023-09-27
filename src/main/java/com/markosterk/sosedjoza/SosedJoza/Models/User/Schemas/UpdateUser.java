package com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateUser {

    @NotNull(message = "Firstname is a required field.")
    @Size(min = 5, message = "Firstname should be at least 4 characters long.")
    private String firstname;

    @NotNull(message = "Lastname is a required field.")
    @Size(min = 5, message = "Lastname should be at least 4 characters long.")
    private String lastname;

}
