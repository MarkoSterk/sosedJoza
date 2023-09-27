package com.markosterk.sosedjoza.SosedJoza.Configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Configs implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry
                .addResourceHandler("/uploads/**")  // URL path to access the resources
                .addResourceLocations("file:uploads/"); // Path to the folder containing the resources
    }
}
