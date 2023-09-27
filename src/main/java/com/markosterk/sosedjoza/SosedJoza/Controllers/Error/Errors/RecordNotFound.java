package com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors;

public class RecordNotFound extends RuntimeException{
    public RecordNotFound(String msg){
        super(msg);
    }
}
