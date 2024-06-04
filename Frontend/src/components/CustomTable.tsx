import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Instrumento } from "../types/Instrumento";

interface CustomTableProps {
	data: Instrumento[];
	handleSelection: (item: Instrumento) => void;
	handleDelete: (item: Instrumento) => void;
	handleOpen: () => void;
	handleClose: () => void; // Agregado para cerrar el modal después de guardar el PDF
}

// Estilos para fijar la primera fila (encabezado)
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	'& .MuiTableCell-head': {
		position: 'sticky',
		top: 0,
		backgroundColor: theme.palette.background.paper,
		zIndex: 1,
	},
}));

export default function CustomTable({
										data,
										handleSelection,
										handleDelete,
										handleOpen,
										handleClose,
									}: CustomTableProps) {
	const handleSaveAsPDF = async (instrumentoId: number) => {
		try {
			const response = await fetch(
				`http://localhost:8080/report/pdf/${instrumentoId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/pdf",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error generating PDF");
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "instrumento.pdf");
			document.body.appendChild(link);
			link.click();
			link.parentNode?.removeChild(link);
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};

	return (
		<StyledTableContainer
			component={Paper}
			sx={{
				width: "90%",
				maxHeight: 440, // Ajustar la altura máxima según sea necesario
			}}
		>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Instrumento</TableCell>
						<TableCell>Marca</TableCell>
						<TableCell>Modelo</TableCell>
						<TableCell>Precio</TableCell>
						<TableCell>Categoria</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						<TableRow
							key={row.instrumento}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>{row.instrumento}</TableCell>
							<TableCell>{row.marca}</TableCell>
							<TableCell>{row.modelo}</TableCell>
							<TableCell>{row.precio}</TableCell>
							<TableCell>{row.categoria?.denominacion}</TableCell>
							<TableCell align="center">
								<Stack direction="row" spacing={2} justifyContent="center">
									<Button
										onClick={() => {
											handleSelection(row);
											handleOpen();
										}}
									>
										Editar
									</Button>
									<Button
										onClick={() => {
											handleDelete(row);
										}}
									>
										Eliminar
									</Button>
									<Button
										onClick={() => {
											handleSaveAsPDF(row.id)
										}}
									>
										Guardar como PDF
									</Button>
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}
