package com.axis.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.demo.model.Users;
import com.axis.demo.repository.UsersRepository;
import com.axis.demo.service.GenerateUserID;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class UsersCntrl {

	@Autowired
	UsersRepository usersRepository;
	@Autowired
    GenerateUserID generateUserID;
	
	@PostMapping("/adduser")
	public String addUser(@RequestBody Users users) {
		

			int userid = generateUserID.getNextUserId();
			System.out.println("Hii the user id is : "+userid);
			users.setUser_id(userid);			
			usersRepository.save(users);
			return "Registration Successful";

	}
	
	@PutMapping("/updateuser")
	public Users updateUserById(@RequestBody Users user)
	{

		Users user1 = (Users)usersRepository.findById(user.getUser_id()).get();
		if(user1.getUser_id() == user.getUser_id())
		{
			
			if(user.getFirst_name()!= null && !user.getFirst_name().isEmpty()) {
			user1.setFirst_name(user.getFirst_name());}
			if(user.getLast_name()!= null && !user.getLast_name().isEmpty()) {
			user1.setLast_name(user.getLast_name());}
			if(user.getEmail()!= null && !user.getEmail().isEmpty()) {
			user1.setEmail(user.getEmail());}
			if(user.getPasswords()!= null && !user.getPasswords().isEmpty()) {
			user1.setPasswords(user.getPasswords());}
			if(user.getRole()!= null && !user.getRole().isEmpty()) {
			user1.setRole(user.getRole());}
			usersRepository.save(user1);
		}
		return user1;
	}
	
	@GetMapping("/allusers")
	public List<Users> getAllUsers()
	{
		return usersRepository.findAll();
		
	}
	
	@GetMapping("/user/{id}")
	public Users getUserById(@PathVariable("id")int id)
	{
		return usersRepository.findById(id).get();
	}
	
	@DeleteMapping("/deleteuser/{id}")
	public String deleteUserById(@PathVariable("id")int id)
	{
		Users user = (Users)usersRepository.findById(id).get();
		if(user.getUser_id() == id)
		{
			usersRepository.delete(user);
		}
		return "Record Deleted!";
	}
	
	@PostMapping("/validateuser")
	public Users validateUser(@RequestBody Users user) throws Exception
	{
	
		String email = user.getEmail();
		String password1 = user.getPasswords();
		
		int userid = usersRepository.findByEmail(email).getUser_id();
		Users emp = usersRepository.findById(userid).get();		
		String password2 = emp.getPasswords();
		
		String role = usersRepository.findByEmail(email).getRole();
		int userid1 = usersRepository.findByEmail(email).getUser_id();
		
		if(password1.equals(password2))
		{
			Users obj = new Users();
			obj.setUser_id(userid1);
			obj.setRole(role);
			System.out.println(obj);
			return obj;
		}
		throw new Exception("Credentials are invalid");
	}
}

