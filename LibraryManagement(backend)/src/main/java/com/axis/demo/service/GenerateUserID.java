package com.axis.demo.service;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.demo.repository.UsersRepository;

@Service
public class GenerateUserID {
	
	@Autowired
	UsersRepository usersRepository;
	 
	 public int getNextUserId() {
		 
		 Integer lastUserId = usersRepository.findMaxUser_id();
		  AtomicInteger counter = new AtomicInteger(lastUserId != null ? lastUserId : 0);
		 
		return counter.incrementAndGet();
	}
}
