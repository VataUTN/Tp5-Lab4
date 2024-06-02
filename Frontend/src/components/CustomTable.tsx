import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Instrumento } from "../types/Instrumento";
import { Button, Stack } from "@mui/material";

interface CustomTableProps {
	data: Instrumento[];
	handleSelection: (item: Instrumento) => void;
	handleDelete: (item: Instrumento) => void;
	handleOpen: () => void;
}

export default function CustomTable({
										data,
										handleSelection,
										handleDelete,
										handleOpen,
									}: CustomTableProps) {
	return (
		<TableContainer
			component={Paper}
			sx={{
				width: "90%",
			}}
		>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>#</TableCell>
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
							<TableCell sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}>{index + 1}</TableCell>
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
		</TableContainer>
	);
}
