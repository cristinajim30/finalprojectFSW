package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.TypeUser;
import com.example.demo.entity.User;
import com.example.demo.repository.TypeUserRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private TypeUserRepository typeUserRepository;
	@Autowired
	private UserRepository userRepository;

	public void createUser(@RequestBody User user) {
		userRepository.save(user);
	}

	public Iterable<User> findAllUsers() {
		return userRepository.findAll();
	}

	public User findUserById(int userId) {

		return userRepository.findById(userId).get();
	}

	public User updateUser(User theUser) {
		return userRepository.save(theUser);
	}

	public Optional<User> deleteUser(int userId) {
		Optional<User> tempUser = userRepository.findById(userId);

		// throw exception if null

		if (tempUser == null) {
			throw new RuntimeException("User id not found - " + userId);
		}

		return tempUser;

	}

	public void createUserType(TypeUser typeUser) {
		typeUserRepository.save(typeUser);
	}

	public Iterable<TypeUser> findAllTypes() {
		return typeUserRepository.findAll();
	}

	public TypeUser findTypeById(int typeId) {

		TypeUser theType = typeUserRepository.findById(typeId).get();
		if (theType == null) {
			throw new RuntimeException("Type id not found - " + typeId);
		}

		return theType;
	}

	public TypeUser updateUserType(TypeUser theTypeUser) {
		return typeUserRepository.save(theTypeUser);
	}

	public TypeUser deleteUserType(int userTypeId) {
		TypeUser tempUserType = typeUserRepository.findById(userTypeId).get();

		if (tempUserType != null) {
			typeUserRepository.deleteById(userTypeId);
			return tempUserType;
		} else {
			return null;
		}
	}
}
