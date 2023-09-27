package com.markosterk.sosedjoza.SosedJoza.Utilities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter @Setter @NoArgsConstructor
public class ApiResponse<T>{

    private Object data;
    private String status;
    private String message;


    public ApiResponse(String status, String message){
        this.status = status;
        this.message = message;
    }

    public ApiResponse(T data, String status, String message){
        this.data = data;
        this.status = status;
        this.message = message;
    }

    public ApiResponse(Map<String, Object> data, String status, String message){
        this.setData(data);
        this.setStatus(status);
        this.setMessage(message);
    }
}
