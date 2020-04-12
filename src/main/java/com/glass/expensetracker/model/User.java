package com.glass.expensetracker.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="user")
public class User {

   @Id
   private Long id;
   private String name;
   private String email;

   @OneToMany
   private Set<Category> category;
}
