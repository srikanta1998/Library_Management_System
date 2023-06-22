package com.axis.demo.controller;

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

import com.axis.demo.model.Book;
import com.axis.demo.repository.BooksRepository;
import com.axis.demo.service.GenerateBookID;
@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v2")
public class BooksCntrl {
	
	@Autowired
	BooksRepository booksRepository;
	
	@Autowired
	GenerateBookID generateBookID;
	
	@PostMapping("/addbook")
	public String addBooks(@RequestBody Book books)
	{
		String isbn = books.getIsbn();
		
		 if(booksRepository.findByIsbn(isbn) != null)
			{
				return "ISBN Already Exists!";
			}		
			int bookid = generateBookID.getNextBookId();
			books.setBook_id(bookid);
			booksRepository.save(books);
		
		return "Book Added!";		
	}
	
	@PutMapping("/updatebook")
	public Book updateBook(@RequestBody Book book)
	{
		Book book1 = (Book)booksRepository.findById(book.getBook_id()).get();
		if(book1.getBook_id() == book.getBook_id())
		{
			if(book.getTitle()!= null && !book.getTitle().isEmpty())
			book1.setTitle(book.getTitle());
			if(book.getSub()!= null && !book.getSub().isEmpty())
			book1.setSub(book.getSub());
			if(book.getAuthor()!= null && !book.getAuthor().isEmpty())
			book1.setAuthor(book.getAuthor());
			if(book.getPublisher()!= null && !book.getPublisher().isEmpty())
			book1.setPublisher(book.getPublisher());
			if(book.getPublication_date()!= null)
			book1.setPublication_date(book.getPublication_date());
			if(book.getIsbn()!= null && !book.getIsbn().isEmpty())
			book1.setIsbn(book.getIsbn());
			
			Object var1 = book.getQuantity();
			if(var1 instanceof Integer)
			book1.setQuantity(book.getQuantity());
			
			Object var2 = book.getAvailable_quantity();
			if(var2 instanceof Integer)
			book1.setAvailable_quantity(book.getAvailable_quantity());
			
			booksRepository.save(book1);
		}
		return book1;
	}
	
	@GetMapping("/allbooks")
	public List<Book> getAllBookS()
	{
		return booksRepository.findAll();
	}
	
	@GetMapping("/onebook/{id}")
	public Book getBookById(@PathVariable("id")int id)
	{
		return booksRepository.findById(id).get();
		
	}
	
	@GetMapping("/books/{Sub}")
	public List<Book> getBookBySub(@PathVariable("Sub")String Sub)throws Exception
	{
		List<Book> books = booksRepository.findBySub(Sub);
	    
	    if (books != null && !books.isEmpty()) {
	        return books;
	    }
	    
	    throw new Exception("No Match found!");	
	}
	
	@DeleteMapping("/deletebook/{id}")
	public String deleteBook(@PathVariable("id")int id)
	{
		Book book = (Book)booksRepository.findById(id).get();
		if(book.getBook_id()==id)
		{
			booksRepository.delete(book);
		}
		return "Record Deleted!";
	}

}
