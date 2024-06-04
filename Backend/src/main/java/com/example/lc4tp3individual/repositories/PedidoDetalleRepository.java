package com.example.lc4tp3individual.repositories;

import com.example.lc4tp3individual.entities.PedidoDetalle;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoDetalleRepository  extends BaseRepository<PedidoDetalle, Long>{
    List<PedidoDetalle> findByPedido_FechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);}
