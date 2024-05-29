package com.example.lc4tp3individual.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    private String instrumento;
    private int cantidad;
    private BigDecimal precio;
}
