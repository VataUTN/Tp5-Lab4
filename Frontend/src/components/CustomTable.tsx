import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Instrumento } from "../types/Instrumento";
import { Button, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';

interface CustomTableProps {
	data: Instrumento[];
	handleSelection: (item: Instrumento) => void;
	handleDelete: (item: Instrumento) => void;
	handleOpen: () => void;
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
									}: CustomTableProps) {
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
								</Stack>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}
