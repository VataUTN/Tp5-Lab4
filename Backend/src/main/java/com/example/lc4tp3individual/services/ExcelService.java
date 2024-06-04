package com.example.lc4tp3individual.services;

import com.example.lc4tp3individual.entities.PedidoDetalle;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelService {

    public ByteArrayInputStream exportPedidosToExcel(List<PedidoDetalle> pedidos) throws IOException {
        String[] columns = {"Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};
        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Sheet sheet = workbook.createSheet("Pedidos");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            Row headerRow = sheet.createRow(0);

            // Crear encabezado de columnas
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerCellStyle);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            int rowIdx = 1;

            for (PedidoDetalle pedido : pedidos) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(pedido.getPedido().getFechaPedido().format(formatter));
                row.createCell(1).setCellValue(pedido.getInstrumento().getInstrumento());
                row.createCell(2).setCellValue(pedido.getInstrumento().getMarca());
                row.createCell(3).setCellValue(pedido.getInstrumento().getModelo());
                row.createCell(4).setCellValue(pedido.getCantidad());
                row.createCell(5).setCellValue(pedido.getInstrumento().getPrecio());
                row.createCell(6).setCellValue(pedido.getCantidad() * Integer.valueOf(pedido.getInstrumento().getPrecio()));
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } finally {
            workbook.close();
        }
    }
}