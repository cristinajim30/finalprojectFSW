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
	void addUser(@RequestBody User user) {
		System.out.println("-----------BACK-----------metodo post users");
		userRepository.save(user);
		System.out.println("-----------BACK-----------user saved");
	}

	@GetMapping("/users")
	public @ResponseBody Iterable<User> getAllUsers() {
		System.out.println("-----------BACK-----------metodo get users");
		return userRepository.findAll();
	}

	// update existing user
	@PutMapping("/users")
	public User updateEmployee(@RequestBody User theUser) {
		System.out.println("-----------BACK-----------metodo put users");
		return userRepository.save(theUser);
	}

	// delete user
	@DeleteMapping("/users/{userId}")
	public void deleteEmployee(@PathVariable int userId) {
		System.out.println("-----------BACK-----------metodo delete users");
		Optional<User> tempUser = userRepository.findById(userId);

		// throw exception if null

		if (tempUser == null) {
			throw new RuntimeException("User id not found - " + userId);
		}

		userRepository.deleteById(userId);
		System.out.println("-----------BACK-----Deleted employee id - " + userId);

		// return "Deleted employee id - " + userId;
	}
}
