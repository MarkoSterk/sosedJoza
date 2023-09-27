package com.markosterk.sosedjoza.SosedJoza.Controllers.Appliance;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.ValidationError;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.ApplianceUrlQueryParams;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.CreateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Rating.Schemas.RateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.UpdateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import com.markosterk.sosedjoza.SosedJoza.Services.Appliance.ApplianceService;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/appliances")
public class ApplianceController {
    @Autowired
    private ApplianceService applianceService;
    @GetMapping("/")
    public ResponseEntity<ApiResponse<Object>> getAppliances(@RequestParam Map<String,String> queryParams){
        ApplianceUrlQueryParams params = new ApplianceUrlQueryParams(queryParams);
        return applianceService.findAllAppliances(params);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getAppliance(@PathVariable long id){
        return applianceService.findApplianceById(id);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse<Object>> createAppliance(@Validated @RequestBody CreateAppliance createAppliance,
                                                               BindingResult bindingResult,
                                                               @AuthenticationPrincipal User currentUser){
        if(bindingResult.hasErrors()){ throw new ValidationError(bindingResult.getAllErrors());}
        return applianceService.createAppliance(createAppliance, currentUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteAppliance(@PathVariable long id,
                                                               @AuthenticationPrincipal User currentUser){
        return applianceService.deleteAppliance(id, currentUser);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> updateAppliance(@PathVariable long id,
                                                               @Validated @RequestBody UpdateAppliance updateAppliance,
                                                               BindingResult bindingResult,
                                                               @AuthenticationPrincipal User currentUser){
        if(bindingResult.hasErrors()){throw new ValidationError(bindingResult.getAllErrors());}
        return applianceService.updateAppliance(id, updateAppliance, currentUser);
    }

    @GetMapping("/{id}/available")
    public ResponseEntity<ApiResponse<Object>> toggleAvailability(@PathVariable long id,
                                                                  @AuthenticationPrincipal User currentUser){
        return applianceService.toggleAvailability(id, currentUser);
    }

    @PostMapping("/images")
    public ResponseEntity<ApiResponse<Object>> uploadImages(@RequestParam("images")MultipartFile[] images) throws IOException {
        return applianceService.uploadImages(images);
    }

    @PostMapping("rating/{id}")
    public ResponseEntity<ApiResponse<Object>> rateAppliance(@PathVariable long id,
                                                             @Validated @RequestBody RateAppliance data,
                                                             BindingResult bindingResult,
                                                             @AuthenticationPrincipal User currentUser){
        if(bindingResult.hasErrors()){throw new ValidationError(bindingResult.getAllErrors());}
        return applianceService.rateAppliance(id, data, currentUser);
    }


}
