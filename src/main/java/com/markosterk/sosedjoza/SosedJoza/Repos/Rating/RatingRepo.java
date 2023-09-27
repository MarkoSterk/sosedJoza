package com.markosterk.sosedjoza.SosedJoza.Repos.Rating;

import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Appliance;
import com.markosterk.sosedjoza.SosedJoza.Models.Rating.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RatingRepo extends JpaRepository<Rating, Long> {
    @Query("SELECT r from Rating r WHERE r.userId = :userId AND r.applianceId = :applianceId")
    Optional<Rating> findByUserAndApplianceId(Long userId, Long applianceId);
}
