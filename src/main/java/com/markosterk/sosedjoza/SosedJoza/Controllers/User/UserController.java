package com.markosterk.sosedjoza.SosedJoza.Controllers.User;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.ValidationError;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.ChangePassword;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.RegisterUser;
import com.markosterk.sosedjoza.SosedJoza.Models.User.Schemas.UpdateUser;
import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import com.markosterk.sosedjoza.SosedJoza.Services.User.UserService;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ApiResponse;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse<Object>> getUsers() throws ValidationException{
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getUserById(@PathVariable long id){
        return userService.findUserById(id);
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<Object>> getCurrentUser(@AuthenticationPrincipal User currentUser){
        return userService.currentUser(currentUser);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse<Object>> createNewUser(@Validated @RequestBody RegisterUser userData,
                                                                     BindingResult bindingResult){
        if(bindingResult.hasErrors()){throw new ValidationError(bindingResult.getAllErrors());}
        return userService.createUser(userData);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable long id,
                                                          @AuthenticationPrincipal User currentUser){
        return userService.deleteUser(id, currentUser);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> updateUserInfo(@PathVariable long id,
                                                            @Validated @RequestBody UpdateUser userData,
                                                              @AuthenticationPrincipal User currentUser,
                                                            BindingResult bindingResult){
        if(bindingResult.hasErrors()){throw new ValidationError(bindingResult.getAllErrors());}
        return userService.updateUser(id, userData, currentUser);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<ApiResponse<Object>> changePassword(@PathVariable long id,
                                                              @Validated @RequestBody ChangePassword passwordData,
                                                              @AuthenticationPrincipal User currentUser,
                                                              BindingResult bindingResult){
        if(bindingResult.hasErrors()){throw new ValidationError(bindingResult.getAllErrors());}
        return userService.changePassword(id, passwordData, currentUser);
    }

    @PatchMapping("/{id}/image")
    public ResponseEntity<ApiResponse<Object>> updateUserImage(@PathVariable long id,
                                                             @RequestPart(value="image") MultipartFile image,
                                                               @AuthenticationPrincipal User currentUser) throws IOException {
        return userService.updateUserImage(id, image, currentUser);
    }
}
