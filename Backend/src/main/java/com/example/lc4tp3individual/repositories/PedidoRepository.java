package com.example.lc4tp3individual.repositories;

import com.example.lc4tp3individual.entities.Pedido;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoRepository  extends BaseRepository<Pedido, Long>{

    List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);

}
