package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.Instrumento;
import com.example.lc4tp3individual.entities.PedidoDetalle;
import com.example.lc4tp3individual.services.ExcelService;
import com.example.lc4tp3individual.services.InstrumentoServiceImp;
import com.example.lc4tp3individual.services.PDFService;
import com.example.lc4tp3individual.services.PedidoDetalleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private PedidoDetalleServiceImpl pedidoDetalleService;

    @Autowired
    private InstrumentoServiceImp instrumentoService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private PDFService pdfService;
    @GetMapping("/report/excel")
    public ResponseEntity<?> generateExcelReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta) {

        try {
            List<PedidoDetalle> pedidos = pedidoDetalleService.findByFechaPedidoBetween(fechaDesde, fechaHasta);
            ByteArrayInputStream in = excelService.exportPedidosToExcel(pedidos);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=pedidos.xlsx");

            return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error generating Excel report: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/report/pdf/{instrumentoId}")
    public ResponseEntity<?> generatePDFReport(@PathVariable Long instrumentoId) {
        try {
            Instrumento instrumento = instrumentoService.findById(instrumentoId);
            ByteArrayInputStream in = pdfService.generateInstrumentoPDF(instrumento);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=instrumento.pdf");

            return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error generating PDF report: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Instrument not found: " + e.getMessage());
        }
    }
}