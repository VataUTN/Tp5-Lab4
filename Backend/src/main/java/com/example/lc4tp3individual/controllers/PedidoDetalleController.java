package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.PedidoDetalle;
import com.example.lc4tp3individual.services.PedidoDetalleServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/pedido-detalle")
public class PedidoDetalleController extends BaseControllerImp<PedidoDetalle, PedidoDetalleServiceImpl>{


    @Autowired
    private PedidoDetalleServiceImpl pedidoDetalleService;

    @PostMapping("/create-batch")
    public ResponseEntity<?> createBatch(@RequestBody List<PedidoDetalle> detalles) {
        try {
            List<PedidoDetalle> savedDetalles = new ArrayList<>();
            for (PedidoDetalle detalle : detalles) {
                savedDetalles.add(servicio.save(detalle));
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDetalles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error, por favor intente mas tarde.\"}");
        }
    }


    @GetMapping("/filter-by-date")
    public ResponseEntity<?> getByFechaPedidoBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta) {
        try {
            List<PedidoDetalle> detalles = pedidoDetalleService.findByFechaPedidoBetween(fechaDesde, fechaHasta);
            return ResponseEntity.status(HttpStatus.OK).body(detalles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving data: " + e.getMessage());
        }
    }

}