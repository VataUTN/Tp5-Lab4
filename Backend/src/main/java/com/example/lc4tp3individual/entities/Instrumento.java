package com.example.lc4tp3individual.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Instrumento extends Base{
    private String instrumento;
    private String marca;
    private String modelo;
    @Column(length = 1000)
    private String imagen;
    private String precio;
    private String costoEnvio;
    private int cantidadVendida;
    @Column(length = 1000)
    private String descripcion;

    @ManyToOne
    private Categoria categoria;

    @OneToMany(mappedBy = "instrumento")
    @JsonBackReference
    private List<PedidoDetalle> pedidosDetalles;
}
