package com.markosterk.sosedjoza.SosedJoza.Models.Rating;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Entity
@Table(name="rating")
@Getter @Setter
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long applianceId;
    private long userId;
    private float rating;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @PrePersist
    public void prePersist(){
        if(this.createdAt==null) this.createdAt = new Date();
    }
}
