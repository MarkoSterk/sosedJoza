package com.markosterk.sosedjoza.SosedJoza.Controllers.Error.Errors;

public class RecordConflictError extends RuntimeException{
    public RecordConflictError(String msg){
        super(msg);
    }
}
