package com.example.pizzeria.service;

import com.example.pizzeria.entity.Ingredient;
import com.example.pizzeria.entity.IngredientDto;
import com.example.pizzeria.repository.IngredientRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepos repository;

    @Autowired
    public IngredientService(IngredientRepos repository) {
        this.repository = repository;
    }

    public List<Ingredient> getAllIngredients() {
        return repository.findAllIngredients();
    }

    public List<IngredientDto> getIngredientList() {
        return repository.findAll().stream().map(ingredient -> new IngredientDto(ingredient.getId(), ingredient.getName(), ingredient.getPrice())).toList();
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        return repository.save(ingredient);
    }

    public Ingredient updateIngredient(Ingredient ingredient) {
        return repository.save(ingredient);
    }

    public void deleteIngredient(Long ingredientId) {
        repository.deleteById(ingredientId);
    }
}
