package com.glass.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.glass.expensetracker.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
