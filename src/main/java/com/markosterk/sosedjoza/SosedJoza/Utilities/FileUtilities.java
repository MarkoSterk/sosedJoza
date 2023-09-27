package com.markosterk.sosedjoza.SosedJoza.Utilities;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.FileError;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


public class FileUtilities {
    @Getter
    private static final List<String> allowedFormats = Arrays.asList(".png", ".jpg", ".jpeg");

    public static String getFileExtension(MultipartFile image){
        if(image.isEmpty()){ throw new FileError();}
        String originalFileName = Objects.requireNonNull(image.getOriginalFilename());
        return originalFileName.substring(originalFileName.lastIndexOf("."));
    }
    public static String generateRandomFileName(String extension){
        return UUID.randomUUID() + extension;
    }

}
