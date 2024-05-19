package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Pedido;
import com.example.lc4tp3individual.entities.PedidoDetalle;
import com.example.lc4tp3individual.services.PedidoService;
import com.example.lc4tp3individual.services.PedidoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/create")
    public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
        pedido.setFechaPedido(LocalDate.now());
        Pedido savedPedido = pedidoService.savePedido(pedido);
        return ResponseEntity.ok(savedPedido);
    }
}