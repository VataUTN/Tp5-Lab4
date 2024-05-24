package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleService extends BaseService<PedidoDetalle, Long>{
    List<PedidoDetalle> saveAll(List<PedidoDetalle> detalles) throws Exception;
}
