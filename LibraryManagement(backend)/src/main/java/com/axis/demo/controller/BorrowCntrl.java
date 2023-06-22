package com.axis.demo.controller;

import java.time.format.DateTimeFormatter;
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
import com.axis.demo.model.Reservation;
import com.axis.demo.model.Users;
import com.axis.demo.repository.BorrowingRepository;
import com.axis.demo.service.GenerateBorrowID;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v4")
public class BorrowCntrl {
	
	@Autowired
	BorrowingRepository borrowRepository;
	
	@Autowired
	GenerateBorrowID generateBorrowID;
	
	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping("/addborrow")
	public Borrowing addBorrowing(@RequestBody Borrowing borrowing)
	{
		int borrowid = generateBorrowID.getNextBorrowId();
		Book response1 = restTemplate.getForObject("http://localhost:9001/api/v2/onebook/"+borrowing.getBook_id(), Book.class);
		if(borrowing.getBook_id() == response1.getBook_id())
		{
			int book_id = response1.getBook_id();
			borrowing.setBook_id(book_id);
		}
		
		Users response2 = restTemplate.getForObject("http://localhost:9001/api/v1/user/"+borrowing.getUser_id(), Users.class);
		if(borrowing.getUser_id() == response2.getUser_id())
		{
			int user_id = response2.getUser_id();
			borrowing.setUser_id(user_id);
		}
		borrowing.setBorrowing_id(borrowid);
		borrowRepository.save(borrowing);
		return borrowing;
	}
	
	@PutMapping("/updateborrow")
	public Borrowing updateBorrowing(@RequestBody Borrowing borrowing)
	{
		Borrowing borrow = (Borrowing)borrowRepository.findById(borrowing.getBorrowing_id()).get();
		if(borrow.getBorrowing_id()== borrowing.getBorrowing_id())
		{
			borrow.setBorrow_date(borrowing.getBorrow_date());
			borrow.setReturn_date(borrowing.getReturn_date());
			borrow.setDue_date(borrowing.getDue_date());
			borrowRepository.save(borrow);
		}
		return borrow;
	}
	
	@GetMapping("/allborrowings")
	public List<Borrowing> getAllBorrowings()
	{
		return borrowRepository.findAll();
	}
	
	@GetMapping("/oneborrowing/{id}")
	public Borrowing getBorrowingById(@PathVariable("id")int id)
	{
		return borrowRepository.findById(id).get();
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteBorrowing(@PathVariable("id")int id)
	{
		Borrowing borrowing = (Borrowing)borrowRepository.findById(id).get();
		if(borrowing.getBorrowing_id()==id)
		{
			borrowRepository.deleteById(id);
		}
		return "record deleted!";
	}
}
