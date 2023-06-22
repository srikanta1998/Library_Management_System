package com.axis.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Borrowing {
	
	@Id
	private int borrowing_id;
	private int user_id;
	private int book_id;
	private LocalDate borrow_date;
	private LocalDate due_date;
	private LocalDate return_date;
	

}
