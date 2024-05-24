package com.example.lc4tp3individual;

import com.example.lc4tp3individual.entities.Categoria;
import com.example.lc4tp3individual.entities.Instrumento;
import com.example.lc4tp3individual.repositories.CategoriaRepository;
import com.example.lc4tp3individual.repositories.InstrumentoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Lc4Tp3IndividualApplication {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    public static void main(String[] args) {
        SpringApplication.run(Lc4Tp3IndividualApplication.class, args);
    }

    @PostConstruct
    public void init() {

        if (categoriaRepository.findById(1L).isEmpty()) {
            Categoria c1 = new Categoria();
            c1.setDenominacion("Viento");
            Categoria c2 = new Categoria();
            c2.setDenominacion("Percusión");
            Categoria c3 = new Categoria();
            c3.setDenominacion("Cuerda");
            Categoria c4 = new Categoria();
            c4.setDenominacion("Teclado");
            Categoria c5 = new Categoria();
            c5.setDenominacion("Electronico");

            categoriaRepository.save(c1);
            categoriaRepository.save(c2);
            categoriaRepository.save(c3);
            categoriaRepository.save(c4);
            categoriaRepository.save(c5);

            if (instrumentoRepository.findById(1L).isEmpty()) {
                Instrumento i1 = new Instrumento();
                i1.setInstrumento("Mandolina Instrumento Musical Stagg Sunburst");
                i1.setMarca("Stagg");
                i1.setModelo("M20");
                i1.setImagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNs6g6bp3YDe4XXlxJYifxCv9bxcAmSkTNiw&s");
                i1.setPrecio("2450");
                i1.setCostoEnvio("G");
                i1.setCantidadVendida("28");
                i1.setDescripcion("Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.");
                i1.setCategoria(c1);

                instrumentoRepository.save(i1);

                Instrumento i2 = new Instrumento();
                i2.setInstrumento("Pandereta Pandero Instrumento Musical");
                i2.setMarca("DyM ventas");
                i2.setModelo("32 sonajas");
                i2.setImagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3VEImb3wx8ojTRNsIkkdvI93RThUtAxFpbg&s");
                i2.setPrecio("325");
                i2.setCostoEnvio("150");
                i2.setCantidadVendida("10");
                i2.setDescripcion("1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ");
                i2.setCategoria(c2);

                instrumentoRepository.save(i2);
            }
        }
    }
}
