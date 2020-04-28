package com.glass.expensetracker.model;

import java.time.LocalDate;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
   //@GeneratedValue(strategy = GenerationType.AUTO)
   //@Column(name = "id", updatable = false, nullable = true)
   private Long id;
   private Double amount;
   private String description;
   private LocalDate expenseDate;
   private String location;
   @ManyToOne
   private Category category;
   @JsonIgnore
   @ManyToOne
   private User user;
}
