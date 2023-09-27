package com.markosterk.sosedjoza.SosedJoza.Models.Appliance;

import com.markosterk.sosedjoza.SosedJoza.Models.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="appliance")
@Getter @Setter @NoArgsConstructor
public class Appliance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private List<String> images = new ArrayList<String>();
    private boolean available = true;
    private String department;
    private float rating = 0;
    private float numberOfRatings = 0;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name="user_id")
    User owner;
    @PrePersist
    public void prePersist(){
        if(this.createdAt==null) this.createdAt = new Date();
    }
}
