package com.example.pizzeria.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/manage/ingredient")
    public String manageIngredients() {
        return "manage-ingredient";
    }

    @GetMapping("/manage/order")
    public String manageOrders() {
        return "manage-order";
    }
}
