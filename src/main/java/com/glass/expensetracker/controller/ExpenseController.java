package com.glass.expensetracker.controller;

import com.glass.expensetracker.model.Category;
import com.glass.expensetracker.model.Expense;
import com.glass.expensetracker.repository.ExpenseRepository;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExpenseController {
   @Autowired
   private ExpenseRepository expenseRepository;
   
   @GetMapping("/expenses")
   List<Expense> getExpenses(){
      return expenseRepository.findAll();
   }
   
   @PostMapping("/expenses")
   ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException{
      Expense result = expenseRepository.save(expense);
      return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
   }
  
   
   @DeleteMapping("/expenses/{id}")
   ResponseEntity<?> deleteExpense(@PathVariable Long id){
      expenseRepository.deleteById(id);
      return ResponseEntity.ok().build();
   }
   
// @PutMapping("/expense/{id}")
// ResponseEntity<Category> updateCategory(@Valid @RequestBody Expense expense){
//    Category result = expenseRepository.save(expense);
//    return ResponseEntity.ok().body(result);
// }
}
