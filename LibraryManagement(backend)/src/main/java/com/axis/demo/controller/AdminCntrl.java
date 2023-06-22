package com.axis.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.demo.model.Admin;
import com.axis.demo.model.Users;
import com.axis.demo.repository.AdminRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v00")
public class AdminCntrl {

	@Autowired
	AdminRepository adminRepository;
	
	
	  	@PostMapping("/validateadmin")
	public String validateAdmin(@RequestBody Admin admin) throws Exception
	{
	
		String username1 = admin.getUsername();
		String password1 = admin.getPassword();
		
		Admin adm = adminRepository.findByUsername(username1);		
		String password2 = adm.getPassword();
		
		
		if(password1.equals(password2))
		{
			return "Admin Authentication Success!";
		}
		throw new Exception("Credentials are invalid");
	}
	
}
