package com.glass.expensetracker.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="user")
public class User {
	private Long id;
	//@Getter @Setter
	
	private String name;
	private String email;
}
