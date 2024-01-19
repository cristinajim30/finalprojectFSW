package com.example.demo;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userRepository.save(user);
	}

	@GetMapping("/users")
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/users/{userId}")
	public Optional<User> getUserById(@PathVariable int userId) {

		Optional<User> theUser = userRepository.findById(userId);
		if (theUser == null) {
			throw new RuntimeException("User id not found - " + userId);
		}

		return theUser;
	}

	// update existing user
	@PutMapping("/users")
	public User updateUser(@RequestBody User theUser) {
		return userRepository.save(theUser);
	}

	// delete user
	@DeleteMapping("/users/{userId}")
	public void deleteUser(@PathVariable int userId) {
		Optional<User> tempUser = userRepository.findById(userId);

		// throw exception if null

		if (tempUser == null) {
			throw new RuntimeException("User id not found - " + userId);
		}

		userRepository.deleteById(userId);

	}

}
