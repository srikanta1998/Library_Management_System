package com.axis.demo.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Reservation {

	@Id
	private int reservation_id;
	private int user_id;
	private int book_id;
	private LocalDate reserved_date;
	private LocalDate due_date;	
	
}
