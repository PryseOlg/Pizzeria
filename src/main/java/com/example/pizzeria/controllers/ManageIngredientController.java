package com.example.pizzeria.controllers;

import com.example.pizzeria.entity.Ingredient;
import com.example.pizzeria.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manage/ingredients")
public class ManageIngredientController {
    private final IngredientService service;

    @Autowired
    public ManageIngredientController(IngredientService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getIngredients() {
        return ResponseEntity.ok(service.getAllIngredients());
    }

    @PostMapping
    public ResponseEntity<?> createIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok(service.createIngredient(ingredient));
    }

    @PutMapping
    public ResponseEntity<?> updateIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok(service.updateIngredient(ingredient));
    }

    @DeleteMapping("/{ingredientId}")
    public ResponseEntity<?> deleteIngredientById(@PathVariable("ingredientId") Long ingredientId) {
        service.deleteIngredient(ingredientId);
        return ResponseEntity.ok().build();
    }
}
