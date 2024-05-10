import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Instrumento } from "../types/Instrumento";
import { Button } from "@mui/material";

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
						<TableCell>Instrumento</TableCell>
						<TableCell>Marca</TableCell>
						<TableCell>Modelo</TableCell>
						<TableCell>Precio</TableCell>
						<TableCell>Categoria</TableCell>
						<TableCell>Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row.instrumento}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>{row.instrumento}</TableCell>
							<TableCell>{row.marca}</TableCell>
							<TableCell>{row.modelo}</TableCell>
							<TableCell>{row.precio}</TableCell>
							<TableCell>{row.categoria?.denominacion}</TableCell>
							<TableCell>
								<Button
									onClick={() => {
										handleSelection(row);
										handleOpen();
									}}
								>
									Editar
								</Button>
							</TableCell>
							<TableCell>
								<Button
									onClick={() => {
										handleDelete(row);
									}}
								>
									Eliminar
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
