package com.glass.expensetracker.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="expense")
public class Expense {

   @Id
   private Long id;
   private Instant expenseDate;
   private String description;
   private String location;
   @ManyToOne
   private Category category;
   
   @JsonIgnore
   @ManyToOne
   private User user;
}
