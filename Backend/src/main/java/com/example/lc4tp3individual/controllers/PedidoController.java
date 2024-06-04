package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Pedido;
import com.example.lc4tp3individual.repositories.PedidoRepository;
import com.example.lc4tp3individual.services.PedidoDetalleServiceImpl;
import com.example.lc4tp3individual.services.PedidoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/pedido")
public class PedidoController extends BaseControllerImp<Pedido, PedidoServiceImpl> {

    @Autowired
    private PedidoServiceImpl pedidoService;
    @GetMapping("/filter-by-date")
    public ResponseEntity<?> getByFechaPedidoBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta) {
        try {
            List<Pedido> detalles = pedidoService.findByFechaPedidoBetween(fechaDesde, fechaHasta);
            return ResponseEntity.status(HttpStatus.OK).body(detalles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving data: " + e.getMessage());
        }
    }
}

