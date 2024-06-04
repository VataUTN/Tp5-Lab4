package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Pedido;
import com.example.lc4tp3individual.repositories.BaseRepository;
import com.example.lc4tp3individual.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PedidoServiceImpl extends BaseServiceImp<Pedido, Long> implements PedidoService{

    @Autowired
    private PedidoRepository pedidoRepository;

    public PedidoServiceImpl(BaseRepository<Pedido, Long> baseRepository, PedidoRepository pedidoRepository) {
        super(baseRepository);
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public Pedido createPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }


    public List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta) throws Exception {
        try {
            return pedidoRepository.findByFechaPedidoBetween(fechaDesde, fechaHasta);
        } catch (Exception e) {
            throw new Exception("Error al buscar detalles del pedido por rango de fechas", e);
        }
    }
}
