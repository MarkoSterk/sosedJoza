package com.markosterk.sosedjoza.SosedJoza.Services.Appliance;

import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.FileError;
import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.RecordNotFound;
import com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors.UnauthorizedError;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Appliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.ApplianceSearchQueryParams;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.ApplianceUrlQueryParams;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.CreateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Rating.Schemas.RateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Schemas.UpdateAppliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Rating.Rating;
import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import com.markosterk.sosedjoza.SosedJoza.Repos.Appliance.ApplianceRepo;
import com.markosterk.sosedjoza.SosedJoza.Repos.Rating.RatingRepo;
import com.markosterk.sosedjoza.SosedJoza.Repos.User.UserRepo;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ApiResponse;
import com.markosterk.sosedjoza.SosedJoza.Utilities.FileUtilities;
import com.markosterk.sosedjoza.SosedJoza.Utilities.ResponseUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplianceService {
    @Autowired
    private ApplianceRepo applianceRepo;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RatingRepo ratingRepo;

    public ResponseEntity<ApiResponse<Object>> findAllAppliances(ApplianceUrlQueryParams params){
        Page<Appliance> appliances = applianceRepo.findAllByQueryParameters(params.getUserId(),
                                                                            params.getDepartment(),
                                                                            params.getAvailable(),
                                                                            params.getRating(),
                                                                            params.getPagination());
        return ResponseUtil.successQuery(appliances);
    }

    public ResponseEntity<ApiResponse<Object>> findApplianceById(long id){
        Optional<Appliance> appliance = applianceRepo.findById(id);
        if(appliance.isEmpty()){
            throw new RecordNotFound("Appliance with this ID does not exist.");
        }
        return ResponseUtil.successQuery(appliance.get());
    }

    public ResponseEntity<ApiResponse<Object>> createAppliance(CreateAppliance createAppliance,
                                                               User currentUser){
        createAppliance.setOwner(currentUser);
        Appliance appliance = new Appliance();
        BeanUtils.copyProperties(createAppliance, appliance);
        applianceRepo.save(appliance);
        return ResponseUtil.generic(appliance,
                "success",
                "Appliance created successfully",
                HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponse<Object>> deleteAppliance(long id, User currentUser){
        Optional<Appliance> appliance = applianceRepo.findById(id);
        if(appliance.isEmpty()){
            throw new RecordNotFound("Appliance with this ID does not exist.");
        }
        if(appliance.get().getOwner().getId()!=currentUser.getId()){throw new UnauthorizedError();}
        applianceRepo.delete(appliance.get());
        return ResponseUtil.deleted("Appliance deleted successfully.");
    }

    public ResponseEntity<ApiResponse<Object>> updateAppliance(long id, UpdateAppliance updateAppliance,
                                                               User currentUser){
        Optional<Appliance> appliance = applianceRepo.findById(id);
        if(appliance.isEmpty()){
            throw new RecordNotFound("Appliance with this ID does not exist.");
        }
        if(appliance.get().getOwner().getId()!=currentUser.getId()){throw new UnauthorizedError();}
        BeanUtils.copyProperties(updateAppliance, appliance.get());
        applianceRepo.save(appliance.get());
        return ResponseUtil.generic(appliance.get(),
                "success",
                "Appliance updated successfully.",
                HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> toggleAvailability(long id, User currentUser){
        Optional<Appliance> appliance = applianceRepo.findById(id);
        if(appliance.isEmpty()){
            throw new RecordNotFound("Appliance with this ID does not exist");
        }
        if(appliance.get().getOwner().getId()!=currentUser.getId()){throw new UnauthorizedError();}
        appliance.get().setAvailable(!appliance.get().isAvailable());
        applianceRepo.save(appliance.get());
        return ResponseUtil.generic(appliance.get(),
                "success",
                "Appliance availability changed successfully.",
                HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> uploadImages(MultipartFile[] images) throws IOException {
        List<String> imageList = new ArrayList<String>();
        for(MultipartFile image : images){
            String extension = FileUtilities.getFileExtension(image);
            if (!FileUtilities.getAllowedFormats().contains(extension)) {
                throw new FileError();
            }
            String randomFilename = FileUtilities.generateRandomFileName(extension);
            Path copyLocation = Paths.get("uploads" + File.separator + randomFilename);
            Files.copy(image.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            imageList.add(randomFilename);
        }
        return ResponseUtil.generic(imageList,
                "success",
                "Images uploaded successfully",
                HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> rateAppliance(long applianceId,
                                                             RateAppliance data,
                                                             User currentUser){
        Optional<Appliance> appliance = applianceRepo.findById(applianceId);
        if(appliance.isEmpty()){
            throw new RecordNotFound("Appliance with this ID does not exist");
        }
        Optional<Rating> rating = ratingRepo.findByUserAndApplianceId(currentUser.getId(),
                                                                        applianceId);
        if(rating.isPresent()){
            return ResponseUtil.error("error",
                    "You already rated this appliance",
                    HttpStatus.NOT_ACCEPTABLE);
        }

        Rating newRating = new Rating();
        data.setApplianceId(applianceId);
        data.setUserId(currentUser.getId());
        BeanUtils.copyProperties(data, newRating);
        ratingRepo.save(newRating);

        float numberOfRatings = appliance.get().getNumberOfRatings();
        float currentRating = appliance.get().getRating();
        appliance.get().setRating((numberOfRatings*currentRating+data.getRating())/(numberOfRatings+1));
        appliance.get().setNumberOfRatings(numberOfRatings+1);
        applianceRepo.save(appliance.get());

        return ResponseUtil.generic(appliance.get(),
                "success",
                "Appliance rated successfully",
                HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse<Object>> searchAppliances(ApplianceSearchQueryParams params) {
        Page<Appliance> appliances = applianceRepo.findBySearch(params.getName(),
                                                                params.getDepartment(),
                                                                params.getPagination());
        return ResponseUtil.generic(appliances,
                "success",
                "Search completed successfully",
                HttpStatus.OK);
    }
}
