package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Categoria;
import com.example.lc4tp3individual.repositories.BaseRepository;
import com.example.lc4tp3individual.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl extends BaseServiceImp<Categoria, Long> implements CategoriaService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(BaseRepository<Categoria, Long> baseRepository, CategoriaRepository categoriaRepository) {
        super(baseRepository);
        this.categoriaRepository = categoriaRepository;
    }
}