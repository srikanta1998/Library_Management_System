package com.axis.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.demo.model.Book;

import jakarta.persistence.Table;


@Table(name = "book")
public interface BooksRepository extends JpaRepository<Book,Integer> {
	
	Book findByIsbn(String Isbn);
	
	List<Book> findBySub(String Sub);

	@Query("SELECT book_id FROM Book ORDER BY book_id DESC LIMIT 1")
	Integer findMaxBook_Id();
}
