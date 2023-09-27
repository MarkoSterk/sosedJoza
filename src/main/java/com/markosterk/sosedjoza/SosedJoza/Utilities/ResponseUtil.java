package com.markosterk.sosedjoza.SosedJoza.Utilities;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseUtil {

    public static ResponseEntity<ApiResponse<Object>> successQuery(Object data) {
        return new ResponseEntity<>(new ApiResponse<>(data,
                "success",
                "Query completed successfully"), HttpStatus.OK);
    }

    public static ResponseEntity<ApiResponse<Object>> notFound(String msg) {
        return new ResponseEntity<>(new ApiResponse<>(null,
                "error",
                msg),
                HttpStatus.NOT_FOUND);
    }

    public static ResponseEntity<ApiResponse<Object>> deleted(String msg) {
        return new ResponseEntity<>(new ApiResponse<>(null, "success", msg), HttpStatus.OK);
    }

    public static ResponseEntity<ApiResponse<Object>> generic(Object data, String status, String message,
            HttpStatus httpStatus) {
        return new ResponseEntity<>(new ApiResponse<>(data, status, message), httpStatus);
    }

    public static ResponseEntity<ApiResponse<Object>> validationError(List<ObjectError> data) {
        Map<String, Object> errors = new HashMap<>();
        for (ObjectError error : data) {
            if (error instanceof FieldError fieldError) {
                String errorMessage = error.getDefaultMessage();
                String fieldName = fieldError.getField();
                errors.put(fieldName, errorMessage);
            }
        }
        return new ResponseEntity<>(new ApiResponse<>(errors,
                "validation error",
                "Please check all provided fields."), HttpStatus.BAD_REQUEST);
    }

    public static ResponseEntity<ApiResponse<Object>> passwordMatchError() {
        Map<String, Object> error = new HashMap<>();
        error.put("password", "Password and confirm password must match.");
        return new ResponseEntity<>(new ApiResponse<>(error,
                "validation error",
                "Please check provided fields."),
                HttpStatus.BAD_REQUEST);
    }

    public static ResponseEntity<ApiResponse<Object>> error(String status, String message, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ApiResponse<>(status, message), httpStatus);
    }
}
