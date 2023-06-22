package com.axis.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Users {

	@Id
	private int user_id;
	private String first_name;
	private String last_name;
	@Column(name="email",unique=true)
	private String email;
	private String passwords;
	private String role;
	
}
