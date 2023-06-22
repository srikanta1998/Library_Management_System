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
public class Fine_management {
	
	@Id
	private int fine_id;
	private int user_id;
	private int book_id;
	private LocalDate due_date;
	private int fine;
	private LocalDate returned_date;

}
