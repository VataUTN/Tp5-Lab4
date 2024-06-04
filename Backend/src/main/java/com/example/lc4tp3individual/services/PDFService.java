package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.Instrumento;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceGray;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;

@Service
public class PDFService {

    public ByteArrayInputStream generateInstrumentoPDF(Instrumento instrumento) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.A4);
        document.setMargins(20, 20, 20, 20);

        // Title
        Paragraph title = new Paragraph("Detalle del Instrumento")
                .setFontSize(18)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        // Image and Details Table
        float[] columnWidths = {1, 2};
        Table table = new Table(UnitValue.createPercentArray(columnWidths));
        table.setWidth(UnitValue.createPercentValue(100));

        // Add instrument details to the table
        Table detailsTable = new Table(1);
        detailsTable.setWidth(UnitValue.createPercentValue(100));
        detailsTable.addCell(new Cell().add(new Paragraph("Nombre: " + instrumento.getInstrumento()).setFontSize(12)).setBorder(null));
        detailsTable.addCell(new Cell().add(new Paragraph("Marca: " + instrumento.getMarca()).setFontSize(12)).setBorder(null));
        detailsTable.addCell(new Cell().add(new Paragraph("Modelo: " + instrumento.getModelo()).setFontSize(12)).setBorder(null));
        detailsTable.addCell(new Cell().add(new Paragraph("Precio: $" + instrumento.getPrecio()).setFontSize(12)).setBorder(null));

        // Add shipping cost details
        String envio = instrumento.getCostoEnvio().equals("G") ? "Envío gratis a todo el país" : "Costo de envío Interior de Argentina: $" + instrumento.getCostoEnvio();
        detailsTable.addCell(new Cell().add(new Paragraph(envio).setFontSize(12)).setBorder(null));

        // Add image to the table
        try {
            String imageUrl = instrumento.getImagen();
            ImageData imageData = ImageDataFactory.create(imageUrl);
            Image image = new Image(imageData);
            image.setWidth(UnitValue.createPercentValue(100));
            table.addCell(new Cell().add(image).setBorder(null));
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        // Add details table to the main table
        table.addCell(new Cell().add(detailsTable).setBorder(null));

        // Add main table to the document
        document.add(table);

        // Add description
        document.add(new Paragraph("Descripción:").setBold().setMarginTop(10));
        document.add(new Paragraph(instrumento.getDescripcion()).setFontSize(12).setMarginBottom(10));

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}