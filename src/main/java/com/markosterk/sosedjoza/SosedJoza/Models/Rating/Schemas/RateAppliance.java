package com.markosterk.sosedjoza.SosedJoza.Models.Rating.Schemas;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RateAppliance {
    @NotNull(message="You must provide a valid rating")
    @Min(value=1, message="Minimal rating is 1")
    @Max(value=5, message="Maximal rating is 5")
    private float rating;

    private long userId;
    private long applianceId;
}
