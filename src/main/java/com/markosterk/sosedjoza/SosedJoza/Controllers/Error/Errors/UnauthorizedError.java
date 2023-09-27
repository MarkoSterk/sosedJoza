package com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UnauthorizedError extends RuntimeException{
    public UnauthorizedError(String msg){
        super(msg);
    }
}
