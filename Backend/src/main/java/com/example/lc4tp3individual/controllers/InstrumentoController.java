package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Instrumento;
import com.example.lc4tp3individual.services.InstrumentoServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/instrumento")
public class InstrumentoController extends BaseControllerImp<Instrumento, InstrumentoServiceImp>{

    @GetMapping("/masVendidos")
    public ResponseEntity<?> getTopMasVendidos(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findTopByOrderByCantidadVendidaDesc());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error, por favor intente mas tarde.\"}");
        }
    }

}
