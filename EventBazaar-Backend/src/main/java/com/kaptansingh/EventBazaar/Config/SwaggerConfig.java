package com.kaptansingh.EventBazaar.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EventBazaar API")
                        .version("0.0.1-SNAPSHOT")
                        .description("API documentation for EventBazaar")
                        .contact(new io.swagger.v3.oas.models.info.Contact()
                                .email("kaptanpal123098@gmail.com")
                                .name("Kaptan Singh"))
                );
    }
}
