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
import org.springframework.web.client.RestTemplate;

import com.axis.demo.model.Book;
import com.axis.demo.model.Borrowing;
import com.axis.demo.model.Fine_management;
import com.axis.demo.model.Users;
import com.axis.demo.repository.FinesRepository;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v5")
public class FinesCntrl {

	@Autowired
	FinesRepository finesRepository;
	
	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping("/addfine")
	public Fine_management addFines(@RequestBody Fine_management fines)
	{
		
		Book response1 = restTemplate.getForObject("http://localhost:9001/api/v2/onebook/"+fines.getBook_id(), Book.class);
		if(fines.getBook_id() == response1.getBook_id())
		{
			int book_id = response1.getBook_id();
			fines.setBook_id(book_id);
		}
		
		Users response2 = restTemplate.getForObject("http://localhost:9001/api/v1/user/"+fines.getUser_id(), Users.class);
		if(fines.getUser_id() == response2.getUser_id())
		{
			int user_id = response2.getUser_id();
			fines.setUser_id(user_id);
		}
		
		finesRepository.save(fines);
		
		return fines;
	}
	
	@PutMapping("/updatefines")
	public Fine_management updateFines(@RequestBody Fine_management fine)
	{
		Fine_management fines = (Fine_management)finesRepository.findById(fine.getFine_id()).get();
		if(fine.getFine_id()== fines.getFine_id())
		{
			fines.setDue_date(fine.getDue_date());
			fines.setReturned_date(fine.getReturned_date());
			fines.setFine(fine.getFine());
			finesRepository.save(fines);
		}		
		return fines;
	}
	
	@GetMapping("/allfines")
	public List<Fine_management> getAllFines()
	{
		return finesRepository.findAll();
	}
	
	@GetMapping("/onefine/{id}")
	public Fine_management getFineById(@PathVariable("id")int id)
	{
		return finesRepository.findById(id).get();
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteFine(@PathVariable("id")int id)
	{
		Fine_management fine = (Fine_management)finesRepository.findById(id).get();
		if(fine.getFine_id()==id)
		{
			finesRepository.deleteById(id);
		}
		return "record deleted!";
	}

	
	
}
