package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.demo.repository.UserRepository;

@SpringBootApplication
public class UsersApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(UsersApplication.class, args);
		UserRepository urepo = context.getBean(UserRepository.class);
	}

}
