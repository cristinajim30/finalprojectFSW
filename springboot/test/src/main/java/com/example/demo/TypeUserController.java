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
public class TypeUserController {

	@Autowired
	private TypeUserRepository typeUserRepository;

	@PostMapping("/type")
	public void addUser(@RequestBody TypeUser typeUser) {
		typeUserRepository.save(typeUser);
	}

	@GetMapping("/type")
	public @ResponseBody Iterable<TypeUser> getAllTypes() {
		return typeUserRepository.findAll();
	}

	@GetMapping("/type/{typeId}")
	public Optional<TypeUser> getTypeById(@PathVariable int typeId) {

		Optional<TypeUser> theType = typeUserRepository.findById(typeId);
		if (theType == null) {
			throw new RuntimeException("Type id not found - " + typeId);
		}

		return theType;
	}

	// update existing usertype
	@PutMapping("/type")
	public TypeUser updateEmployee(@RequestBody TypeUser theTypeUser) {
		return typeUserRepository.save(theTypeUser);
	}

	// delete usertype
	@DeleteMapping("/type/{userTypeId}")
	public void deleteUserType(@PathVariable int userTypeId) {
		Optional<TypeUser> tempUserType = typeUserRepository.findById(userTypeId);

		// throw exception if null
		if (tempUserType == null) {
			throw new RuntimeException("UserType id not found - " + userTypeId);
		}

		typeUserRepository.deleteById(userTypeId);
	}
}
