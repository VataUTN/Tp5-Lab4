package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Pedido;
import com.example.lc4tp3individual.services.PedidoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/pedido")
public class PedidoController extends BaseControllerImp<Pedido, PedidoServiceImpl>{
}
