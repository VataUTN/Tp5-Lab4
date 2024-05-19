package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Pedido;
import com.example.lc4tp3individual.entities.PedidoDetalle;
import com.example.lc4tp3individual.repositories.PedidoRepository;
import com.example.lc4tp3individual.repositories.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    public Pedido savePedido(Pedido pedido) {
        // Asignar el pedido a cada detalle del pedido
        for (PedidoDetalle detalle : pedido.getDetalles()) {
            detalle.setPedido(pedido);
        }
        Pedido savedPedido = pedidoRepository.save(pedido);
        pedidoDetalleRepository.saveAll(pedido.getDetalles());
        return savedPedido;
    }
}
