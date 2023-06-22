package com.axis.demo.service;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.demo.repository.BorrowingRepository;

@Service
public class GenerateBorrowID {

	@Autowired
	BorrowingRepository borrowRepository;
	
 public int getNextBorrowId() {
		 
		 Integer lastBorrowId = borrowRepository.findMaxBorrowing_id();
		  AtomicInteger counter = new AtomicInteger(lastBorrowId != null ? lastBorrowId : 0);
		 
		return counter.incrementAndGet();
	}
}
