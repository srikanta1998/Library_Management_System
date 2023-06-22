package com.axis.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.axis.demo.model.Borrowing;

import jakarta.persistence.Table;

@Table(name = "borrowing")
public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {

	@Query("SELECT borrowing_id FROM Borrowing ORDER BY borrowing_id DESC LIMIT 1")
	Integer findMaxBorrowing_id();
}
