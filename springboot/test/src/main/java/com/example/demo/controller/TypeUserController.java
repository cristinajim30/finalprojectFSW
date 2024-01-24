package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
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

import com.example.demo.entity.TypeUser;
import com.example.demo.services.UserService;

@PropertySource("classpath:application.properties")
@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class TypeUserController {

	@Autowired
	private UserService userService;

	@PostMapping("/type")
	public void addUserType(@RequestBody TypeUser typeUser) {
		userService.createUserType(typeUser);
	}

	@GetMapping("/type")
	public @ResponseBody Iterable<TypeUser> getAllTypes() {
		return userService.findAllTypes();
	}

	@GetMapping("/type/{typeId}")
	public ResponseEntity<TypeUser> getTypeById(@PathVariable int typeId) {

		TypeUser theType = userService.findTypeById(typeId);
		if (theType != null) {
			return ResponseEntity.ok(theType);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// update existing usertype
	@PutMapping("/type")
	public TypeUser updateEmployee(@RequestBody TypeUser theTypeUser) {
		return userService.updateUserType(theTypeUser);
	}

	// delete usertype
	@DeleteMapping("/type/{userTypeId}")
	public ResponseEntity deleteUserType(@PathVariable int userTypeId) {
		TypeUser tempUserType = userService.deleteUserType(userTypeId);

		if (tempUserType != null) {
			return ResponseEntity.ok(tempUserType);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
