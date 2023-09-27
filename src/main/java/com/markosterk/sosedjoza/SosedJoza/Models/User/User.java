package com.markosterk.sosedjoza.SosedJoza.Models.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.markosterk.sosedjoza.SosedJoza.Models.Appliance.Appliance;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "user")
@Getter @Setter @NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String email;
    private String firstname;
    private String lastname;
    private String image = "default.jpg";
    private String role = "user";

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt;

    @JsonIgnore
    private String password;

    @PrePersist
    public void hashPassword(){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(this.password);
        if(this.createdAt==null) this.createdAt = new Date();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    public Collection<? extends GrantedAuthority> authorities;
}
