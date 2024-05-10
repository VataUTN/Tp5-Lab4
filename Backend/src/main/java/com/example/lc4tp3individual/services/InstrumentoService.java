package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Instrumento;

import java.util.List;

public interface InstrumentoService extends BaseService<Instrumento, Long>{

    public List<Instrumento> findTopByOrderByCantidadVendidaDesc() throws Exception;
}
