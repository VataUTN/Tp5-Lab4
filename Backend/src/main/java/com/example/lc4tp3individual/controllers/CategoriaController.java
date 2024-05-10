package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Categoria;
import com.example.lc4tp3individual.entities.Instrumento;
import com.example.lc4tp3individual.services.CategoriaServiceImpl;
import com.example.lc4tp3individual.services.InstrumentoServiceImp;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/categoria")
public class CategoriaController extends BaseControllerImp<Categoria, CategoriaServiceImpl>{
}
