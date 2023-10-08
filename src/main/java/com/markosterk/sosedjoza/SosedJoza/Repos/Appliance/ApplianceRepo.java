package com.markosterk.sosedjoza.SosedJoza.Repos.Appliance;

import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Appliance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ApplianceRepo extends JpaRepository<Appliance, Long> {

    @Query("SELECT a from Appliance a WHERE (:userId IS NULL OR a.owner.id = :userId) AND a.department IN :department AND a.available IN :available AND a.rating >= :rating")
    Page<Appliance> findAllByQueryParameters(Long userId,
                                             String[] department,
                                             boolean[] available,
                                             Number rating,
                                             Pageable pageable);
    @Query("SELECT a from Appliance a WHERE a.name LIKE %:name% AND a.department IN :department")
    Page<Appliance> findBySearch(String name,
                                 String[] department,
                                 Pageable pageable);
}
