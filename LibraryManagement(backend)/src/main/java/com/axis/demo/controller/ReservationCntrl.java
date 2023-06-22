package com.axis.demo.controller;

import java.io.Console;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.axis.demo.model.Reservation;
import com.axis.demo.model.Users;
import com.axis.demo.repository.BooksRepository;
import com.axis.demo.repository.ReservationRepository;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v3")
public class ReservationCntrl {
	
	@Autowired
	ReservationRepository reservationRepository;
	
	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping("/addreservation")
	public Reservation addReservation(@RequestBody Reservation reservation)
	{		
		
		Book response1 = restTemplate.getForObject("http://localhost:9001/api/v2/onebook/"+reservation.getBook_id(), Book.class);
		if(reservation.getBook_id() == response1.getBook_id())
		{
			int book_id = response1.getBook_id();
			reservation.setBook_id(book_id);
		}
		
		Users response2 = restTemplate.getForObject("http://localhost:9001/api/v1/user/"+reservation.getUser_id(), Users.class);
		if(reservation.getUser_id() == response2.getUser_id())
		{
			int user_id = response2.getUser_id();
			reservation.setUser_id(user_id);
		}
		
		reservationRepository.save(reservation);
		return reservation;
	}
	
	@PutMapping("/updatereservation")
	public Reservation updateReservation(@RequestBody Reservation reservation)
	{
		Reservation reserve = (Reservation)reservationRepository.findById(reservation.getReservation_id()).get();
		if(reserve.getReservation_id() == reservation.getReservation_id())
		{
			reserve.setReserved_date(reservation.getReserved_date());
			reserve.setDue_date(reservation.getDue_date());
			reservationRepository.save(reserve);
		}
		return reserve;
	}
	
	@GetMapping("/allreservations")
	public List<Reservation> getAllReservations()
	{
		return reservationRepository.findAll();
	}

	@GetMapping("/onereservation/{id}")
	public Reservation getReservationById(@PathVariable("id")int id)
	{
		return reservationRepository.findById(id).get();
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteReservation(@PathVariable("id")int id)
	{
		Reservation reservation = (Reservation)reservationRepository.findById(id).get();
		if(reservation.getReservation_id() == id)
		{
			reservationRepository.deleteById(id);
		}
		return "Record Deleted!";
	}
	
}
