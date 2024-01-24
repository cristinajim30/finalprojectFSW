package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TypeUser;

@Repository
public interface TypeUserRepository extends CrudRepository<TypeUser, Integer> {

}
