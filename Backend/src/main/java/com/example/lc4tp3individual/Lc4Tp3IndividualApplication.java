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
                i1.setCantidadVendida(28);
                i1.setDescripcion("Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.");
                i1.setCategoria(c3);

                instrumentoRepository.save(i1);

                Instrumento i2 = new Instrumento();
                i2.setInstrumento("Pandereta Pandero Instrumento Musical");
                i2.setMarca("DyM ventas");
                i2.setModelo("32 sonajas");
                i2.setImagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3VEImb3wx8ojTRNsIkkdvI93RThUtAxFpbg&s");
                i2.setPrecio("325");
                i2.setCostoEnvio("150");
                i2.setCantidadVendida(10);
                i2.setDescripcion("1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ");
                i2.setCategoria(c2);

                instrumentoRepository.save(i2);

                Instrumento i3 = new Instrumento();
                i3.setInstrumento("Guitarra Acústica Fender CD-60S");
                i3.setMarca("Fender");
                i3.setModelo("CD-60S");
                i3.setImagen("https://www.solomusicaweb.com/media/catalog/product/cache/1/thumbnail/800x800/9df78eab33525d08d6e5fb8d27136e95/s/h/shopping_1__7.png");
                i3.setPrecio("600");
                i3.setCostoEnvio("120");
                i3.setCantidadVendida(15);
                i3.setDescripcion("La guitarra acústica Fender CD-60S es perfecta para principiantes y músicos intermedios. Cuenta con una tapa de abeto, aros y fondo de caoba, diapasón de palisandro y un sonido cálido y equilibrado.");
                i3.setCategoria(c3);

                instrumentoRepository.save(i3);

                Instrumento i4 = new Instrumento();
                i4.setInstrumento("Violín Yamaha V3");
                i4.setMarca("Yamaha");
                i4.setModelo("V3");
                i4.setImagen("https://www.pngall.com/wp-content/uploads/2016/06/Violin-PNG-File.png");
                i4.setPrecio("800");
                i4.setCostoEnvio("230");
                i4.setCantidadVendida(20);
                i4.setDescripcion("El violín Yamaha V3 es una excelente opción para estudiantes avanzados y músicos profesionales. Con una construcción de abeto y arce, ofrece un tono rico y resonante. Viene con estuche y arco incluidos.");
                i4.setCategoria(c3);

                instrumentoRepository.save(i4);

                Instrumento i5 = new Instrumento();
                i5.setInstrumento("Bajo Eléctrico Ibanez GSR200");
                i5.setMarca("Ibanez");
                i5.setModelo("GSR200");
                i5.setImagen("https://www.pngkey.com/png/full/385-3855660_white-guitar-png.png");
                i5.setPrecio("400");
                i5.setCostoEnvio("G");
                i5.setCantidadVendida(12);
                i5.setDescripcion("El bajo eléctrico Ibanez GSR200 es ideal para músicos que buscan un instrumento versátil y de alta calidad. Con cuerpo de tilo, mástil de arce y pastillas de diseño propio, ofrece un sonido potente y definido.");
                i5.setCategoria(c3);

                instrumentoRepository.save(i5);

                Instrumento i6 = new Instrumento();
                i6.setInstrumento("Flauta Travesera Yamaha YFL-222");
                i6.setMarca("Yamaha");
                i6.setModelo("YFL-222");
                i6.setImagen("https://cdnx.jumpseller.com/instruments/image/23487141/resize/635/635?1657302538");
                i6.setPrecio("900");
                i6.setCostoEnvio("110");
                i6.setCantidadVendida(25);
                i6.setDescripcion("La flauta travesera Yamaha YFL-222 es perfecta para estudiantes y músicos aficionados. Fabricada en níquel plateado, cuenta con una excelente respuesta y afinación, ideal para estudios y presentaciones.");
                i6.setCategoria(c1);

                instrumentoRepository.save(i6);

                Instrumento i7 = new Instrumento();
                i7.setInstrumento("Saxofón Alto Yamaha YAS-280");
                i7.setMarca("Yamaha");
                i7.setModelo("YAS-280");
                i7.setImagen("https://media.ng-musique.com/684-2452-tm_thickbox_default/saxophone-alto-yamaha-yas-280.jpg");
                i7.setPrecio("1500");
                i7.setCostoEnvio("345");
                i7.setCantidadVendida(18);
                i7.setDescripcion("El saxofón alto Yamaha YAS-280 es la elección perfecta para estudiantes y músicos principiantes. Ofrece un sonido rico y cálido, una excelente respuesta y una construcción duradera, todo a un precio asequible.");
                i7.setCategoria(c1);

                instrumentoRepository.save(i7);

                Instrumento i8 = new Instrumento();
                i8.setInstrumento("Trompeta Bach TR300H2");
                i8.setMarca("Bach");
                i8.setModelo("TR300H2");
                i8.setImagen("https://th.bing.com/th/id/OIP.BphaoOSgKXR8u4TkanNzowHaHa?rs=1&pid=ImgDetMain");
                i8.setPrecio("1200");
                i8.setCostoEnvio("260");
                i8.setCantidadVendida(14);
                i8.setDescripcion("La trompeta Bach TR300H2 es una opción popular entre estudiantes y músicos aficionados. Con una construcción de latón dorado, ofrece un sonido brillante y claro, así como una excelente proyección.");
                i8.setCategoria(c1);

                instrumentoRepository.save(i8);

                Instrumento i9 = new Instrumento();
                i9.setInstrumento("Clarinet Yamaha YCL-255");
                i9.setMarca("Yamaha");
                i9.setModelo("YCL-255");
                i9.setImagen("https://th.bing.com/th/id/OIP.E5UbYBCLshue5oSWEp8gyAHaHa?rs=1&pid=ImgDetMain");
                i9.setPrecio("950");
                i9.setCostoEnvio("G");
                i9.setCantidadVendida(20);
                i9.setDescripcion("El clarinete Yamaha YCL-255 es una excelente opción para estudiantes de nivel principiante e intermedio. Ofrece una gran respuesta, entonación precisa y una construcción duradera, todo a un precio asequible.");
                i9.setCategoria(c1);

                instrumentoRepository.save(i9);

                Instrumento i10 = new Instrumento();
                i10.setInstrumento("Piano Digital Yamaha P-45");
                i10.setMarca("Yamaha");
                i10.setModelo("P-45");
                i10.setImagen("https://tiendamusicalcardona.com/wp-content/uploads/2023/06/PIANO-YAMAHA-P45-700x700.png");
                i10.setPrecio("1200");
                i10.setCostoEnvio("270");
                i10.setCantidadVendida(10);
                i10.setDescripcion("El piano digital Yamaha P-45 ofrece un sonido de piano auténtico y una sensación de teclado realista. Con 88 teclas contrapesadas, múltiples voces de instrumentos y funciones prácticas, es perfecto para músicos de todos los niveles.");
                i10.setCategoria(c4);

                instrumentoRepository.save(i10);

                Instrumento i11 = new Instrumento();
                i11.setInstrumento("Órgano Casio CT-X700");
                i11.setMarca("Casio");
                i11.setModelo("CT-X700");
                i11.setImagen("https://th.bing.com/th/id/R.996623fc713ce64a4f7b61dec09a8bec?rik=4rbK%2fUw1qmcOIw&pid=ImgRaw&r=0");
                i11.setPrecio("450");
                i11.setCostoEnvio("G");
                i11.setCantidadVendida(8);
                i11.setDescripcion("El órgano Casio CT-X700 es una excelente opción para músicos principiantes y aficionados. Con una amplia variedad de tonos y ritmos, funciones de aprendizaje y conectividad USB, ofrece muchas posibilidades creativas.");
                i11.setCategoria(c4);

                instrumentoRepository.save(i11);

            }
        }
    }
}