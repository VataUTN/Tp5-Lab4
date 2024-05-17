package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.PedidoDetalle;
import com.example.lc4tp3individual.services.PedidoDetalleServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/pedido-detalle")
public class PedidoDetalleController extends BaseControllerImp<PedidoDetalle, PedidoDetalleServiceImpl>{
}