package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userService.createUser(user);
	}

	@GetMapping("/users")
	public @ResponseBody Iterable<User> getAllUsers() {
		return userService.findAllUsers();
	}

	@GetMapping("/users/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable int userId) {

		User user = userService.findUserById(userId);

		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	// update existing user
	@PutMapping("/users")
	public User updateUser(@RequestBody User theUser) {
		return userService.updateUser(theUser);
	}

	// delete user
	@DeleteMapping("/users/{userId}")
	public ResponseEntity deleteUser(@PathVariable int userId) {
		Optional<User> user = userService.deleteUser(userId);

		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
