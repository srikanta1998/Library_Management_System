package com.axis.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.demo.model.Fine_management;

@Repository
public interface FinesRepository extends JpaRepository<Fine_management, Integer>{

}
