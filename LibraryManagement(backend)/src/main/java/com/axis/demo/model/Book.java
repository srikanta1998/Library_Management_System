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
public class Book {
	
	@Id
	private int book_id;
	private String title;
	private String author;
	private String sub;
	private String isbn;
	private String publisher;
	private LocalDate publication_date;
	private int quantity;
	private int available_quantity;

}
