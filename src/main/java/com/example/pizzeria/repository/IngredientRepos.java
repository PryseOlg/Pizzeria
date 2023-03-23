package com.example.pizzeria.repository;

import com.example.pizzeria.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientRepos extends JpaRepository<Ingredient, Long> {
    @Query(value = "SELECT * FROM ingredients", nativeQuery = true)
    List<Ingredient> findAllIngredients();
}
