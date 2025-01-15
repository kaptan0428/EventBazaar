package com.kaptansingh.EventBazaar;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventBazaarAnEventManagementServiceApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();

		SpringApplication.run(EventBazaarAnEventManagementServiceApplication.class, args);
	}
}
