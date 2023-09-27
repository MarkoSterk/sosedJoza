package com.markosterk.sosedjoza.SosedJoza.Controllers.Error;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.*;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ApiResponse;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ErrorController {
    @ExceptionHandler({ RecordNotFound.class })
    public ResponseEntity<ApiResponse<Object>> handleRecordNotFoundException(RecordNotFound ex,
                                                                         WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>(null,
                "error",
                ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ ValidationError.class })
    public ResponseEntity<ApiResponse<Object>> handleValidationException(ValidationError ex,
                                                                             WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>(ex.getErrors(),
                "error",
                ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ RecordConflictError.class })
    public ResponseEntity<ApiResponse<Object>> handleRecordConflictException(RecordConflictError ex,
                                                                             WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>(null,
                "error", ex.getMessage()),
                HttpStatus.CONFLICT);
    }
    @ExceptionHandler({ FileError.class })
    public ResponseEntity<ApiResponse<Object>> handleFileException(FileError ex,
                                                                   WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>("error",
                "Please provide valid file or files."),
                HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({IOException.class})
    public ResponseEntity<ApiResponse<Object>> handleIOException(IOException ex,
                                                                 WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>("error",
                "Something went wrong during file storage."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler({UnauthorizedError.class})
    public ResponseEntity<ApiResponse<Object>> handleUnauthorizedException(UnauthorizedError ex,
                                                                           WebRequest request){
        String msg = ex.getMessage()==null ? "You are not authorized for this action" : ex.getMessage();
        return new ResponseEntity<>(new ApiResponse<>("error",
                msg),
                HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler({MultipartException.class})
    public ResponseEntity<ApiResponse<Object>> handleMultipartException(MultipartException ex,
                                                                        WebRequest request) {
        return new ResponseEntity<>(new ApiResponse<>("error",
                "Error during file upload. Please check provided file or files."),
                HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({MissingServletRequestPartException.class})
    public ResponseEntity<ApiResponse<Object>> handleMissingServletRequestPartException(MissingServletRequestPartException ex,
                                                                                        WebRequest request){
        return new ResponseEntity<>(new ApiResponse<>("error",
                "Missing required data or part of data"),
                HttpStatus.BAD_REQUEST);
    }

}
