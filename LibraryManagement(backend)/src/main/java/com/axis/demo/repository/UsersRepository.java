package com.axis.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.axis.demo.model.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Table(name = "users")
public interface UsersRepository extends JpaRepository<Users, Integer>{

	Users findByEmail(String Email);
	Users findByPasswords(String Passwords);
	
	@Query("SELECT user_id FROM Users ORDER BY user_id DESC LIMIT 1")
	Integer findMaxUser_id();
}
