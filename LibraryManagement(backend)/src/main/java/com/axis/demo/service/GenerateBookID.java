package com.axis.demo.service;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.demo.repository.BooksRepository;

@Service
public class GenerateBookID {
	
	@Autowired
	BooksRepository booksRepository;
	
	public int getNextBookId()
	{
		Integer lastBookId = booksRepository.findMaxBook_Id();
		AtomicInteger counter = new AtomicInteger(lastBookId != null ? lastBookId : 0);
		
		return counter.incrementAndGet();
	}

}
