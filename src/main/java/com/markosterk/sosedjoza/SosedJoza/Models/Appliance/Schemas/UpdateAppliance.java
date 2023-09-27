package com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.ValidationError;
import jakarta.persistence.PostLoad;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter @Setter @NoArgsConstructor
public class UpdateAppliance {
    @NotNull(message = "Appliance name is a required field.")
    @Size(min = 5, message = "Appliance name should be at least 5 characters long.")
    private String name;

    @NotNull(message="Appliance description is required.")
    @Size(min=10, message="Appliance description should be at least 10 characters long.")
    private String description;

    @NotNull(message = "Department is a required field.")
    private String department;

    private List<String> images = new ArrayList<String>();

    @PostLoad
    public void checkCategory(){
        List<String> allowed = Arrays.asList("kuhinja", "delavnica", "vrt", "multimedia", "prosti čas", "ostalo");
        boolean check = allowed.contains(this.getDepartment());
        if(!check){
            Map<String, Object> errors = new HashMap<>();
            errors.put("department", "Provided department does not exist.");
            throw new ValidationError(errors);
        }
    }
}
