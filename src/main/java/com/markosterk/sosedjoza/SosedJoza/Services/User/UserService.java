package com.markosterk.sosedjoza.SosedJoza.Services.User;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.*;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.ChangePassword;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.UpdateUser;
import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.RegisterUser;
import com.markosterk.sosedjoza.SosedJoza.Repos.User.UserRepo;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ApiResponse;
import com.markosterk.sosedjoza.SosedJoza.Utilities.FileUtilities;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ResponseUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    private static BCryptPasswordEncoder passwordEcorder = new BCryptPasswordEncoder();

    public ResponseEntity<ApiResponse<Object>> findAllUsers(){
        List<User> users = userRepo.findAll();
        return ResponseUtil.successQuery(users);
    }

    public ResponseEntity<ApiResponse<Object>> findUserById(long id){
        Optional<User> user = userRepo.findById(id);
        if(user.isEmpty()){
            throw new RecordNotFound("User with this ID does not exist");
        }
        return ResponseUtil.successQuery(user.get());
    }

    public ResponseEntity<ApiResponse<Object>> currentUser(User currentUser){
        Optional<User> user = userRepo.findById(currentUser.getId());
        if(user.isEmpty()) throw new RecordNotFound("Current user unavailable.");
        return ResponseUtil.generic(user.get(),
                "success",
                "User data loaded successfully.",
                HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> createUser(RegisterUser userData){
        Optional<User> checkUser = userRepo.findByEmail(userData.getEmail());
        if(checkUser.isPresent()){
            throw new RecordConflictError("User with this eMail already exists");
        }
        RegisterUser.checkPasswordMatch(userData.getPassword(), userData.getConfirmPassword());
        User user = new User();
        BeanUtils.copyProperties(userData, user);
        userRepo.save(user);
        return ResponseUtil.generic(user,
                "success",
                "New user created successfully",
                HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponse<Object>> updateUser(long id, UpdateUser userData,
                                                                  User currentUser){
        Optional<User> user = userRepo.findById(id);
        if(user.isEmpty()){
            throw new RecordNotFound("User with this ID does not exist");
        }
        if(user.get().getId() != currentUser.getId()){ throw new UnauthorizedError();}
        user.get().setFirstname(userData.getFirstname());
        user.get().setLastname(userData.getLastname());
        userRepo.save(user.get());
        return ResponseUtil.generic(user.get(),
                "success",
                "User data updated successfully.", HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> deleteUser(long id, User currentUser){
        Optional<User> user = userRepo.findById(id);
        if(user.isEmpty()){
            throw new RecordNotFound("User with this ID does not exist");
        }
        if(!Objects.equals(currentUser.getRole(), "admin")){throw new UnauthorizedError();}
        userRepo.delete(user.get());
        return ResponseUtil.deleted("User deleted successfully");
    }

    public ResponseEntity<ApiResponse<Object>> updateUserImage(long id, MultipartFile image,
                                                               User currentUser) throws IOException {
        String extension = FileUtilities.getFileExtension(image);

        if (!FileUtilities.getAllowedFormats().contains(extension)) {
            throw new FileError();
        }
        Optional<User> user = userRepo.findById(id);
        if (user.isEmpty()) {
            throw new RecordNotFound("User with this ID does not exist.");
        }
        if(user.get().getId() != currentUser.getId()){ throw new UnauthorizedError(); }
        String randomFilename = FileUtilities.generateRandomFileName(extension);
        Path copyLocation = Paths.get("uploads" + File.separator + randomFilename);
        Files.copy(image.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
        user.get().setImage(randomFilename);
        userRepo.save(user.get());
        return ResponseUtil.generic(user.get(), "success",
                "User image changed successfully.", HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> changePassword(long id, ChangePassword passwordData,
                                                              User currentUser){
        if(!passwordEcorder.matches(passwordData.getCurrentPassword(),
                currentUser.getPassword())){
            throw new UnauthorizedError("Wrong password.");
        }
        RegisterUser.checkPasswordMatch(passwordData.getPassword(),
                passwordData.getConfirmPassword());
        if(currentUser.getId()!=id){
            throw new UnauthorizedError();
        }
        currentUser.setPassword(passwordData.getPassword());
        currentUser.hashPassword();
        userRepo.save(currentUser);
        return ResponseUtil.generic(currentUser,
                "success",
                "User password changed successfully",
                HttpStatus.OK);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email).orElseThrow();
    }
}
