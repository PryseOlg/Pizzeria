package com.example.pizzeria.repository;

import com.example.pizzeria.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepos extends JpaRepository<Order, Long> {
}
