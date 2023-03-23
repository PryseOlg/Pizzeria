package com.example.pizzeria.controllers;

import com.example.pizzeria.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manage/order")
public class ManageOrderController {
    private final OrderService service;

    @Autowired
    public ManageOrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getListOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }
}
