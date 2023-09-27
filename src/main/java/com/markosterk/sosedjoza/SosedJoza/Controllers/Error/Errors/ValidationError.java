package com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors;

import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationError extends RuntimeException{
    private Map<String, Object> errors = new HashMap<>();

    public ValidationError(List<ObjectError> data){
        super("Please check provided fields.");
        this.setErrors(data);
    }

    public ValidationError(Map<String, Object> data){
        super("Please check provided fields.");
        this.setErrors(data);
    }

    public void setErrors(List<ObjectError> data){
        for(ObjectError error : data){
            if(error instanceof FieldError fieldError){
                String errorMessage = error.getDefaultMessage();
                String fieldName = fieldError.getField();
                this.errors.put(fieldName, errorMessage);
            }
        }
    }

    public void setErrors(Map<String, Object> data){
        this.errors = data;
    }

    public Map<String, Object> getErrors(){
        return this.errors;
    }


}
