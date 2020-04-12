package com.glass.expensetracker.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Data;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="category")
public class Category {

   @Id
   private Long id;
   @NonNull
   private String name;
}
