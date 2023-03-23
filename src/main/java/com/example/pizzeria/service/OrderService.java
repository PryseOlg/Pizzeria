package com.example.pizzeria.service;

import com.example.pizzeria.entity.Ingredient;
import com.example.pizzeria.entity.Order;
import com.example.pizzeria.repository.IngredientRepos;
import com.example.pizzeria.repository.OrderRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepos repository;
    private final IngredientRepos ingredientRepos;

    @Autowired
    public OrderService(OrderRepos repository, IngredientRepos ingredientRepos) {
        this.repository = repository;
        this.ingredientRepos = ingredientRepos;
    }

    public Order createOrder(Order order) {
        var endPrice = 0;
        for (Ingredient ingredient : order.getIngredients()) {
            var optionalSavedIngredient = ingredientRepos.findById(ingredient.getId());
            if (optionalSavedIngredient.isEmpty()) {
                throw new IllegalArgumentException("Ingredient not exist!");
            }
            var savedIngredient = optionalSavedIngredient.get();
            savedIngredient.setCountInStock(savedIngredient.getCountInStock() - 1);
            ingredientRepos.save(savedIngredient);
            endPrice += savedIngredient.getPrice();
        }
        order.setEndPrice(endPrice);
        return repository.save(order);
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }
}
