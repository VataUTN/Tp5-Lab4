import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { Instrumento } from "../types/Instrumento";
import { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import { deleteData, getData } from "../api/genericRequest";
import { Categoria } from "../types/Categoria";
import { ModalInstrumento } from "../components/ModalInstrumento";

export const AdminPage = () => {
	const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
	const [instrumentosFiltrados, setInstrumentosFiltrados] = useState<Instrumento[]>([]);
	const [selectedInstrumento, setselectedInstrumento] = useState<Instrumento | undefined>(undefined);

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleNew = () => {
		setselectedInstrumento(undefined);
	};

	const handleSelection = (instrumento: Instrumento) => {
		setselectedInstrumento(instrumento);
	};

	const handleDelete = async (instrumento: Instrumento) => {
		await deleteData("http://localhost:8080/instrumento/" + instrumento.id);
		handleClose();
	};

	useEffect(() => {
		const fetchData = async () => {
			let instrumentosRaw = await getData<Instrumento[]>("http://localhost:8080/instrumento");
			if (instrumentosRaw) {
				setInstrumentos(instrumentosRaw);
				setInstrumentosFiltrados(instrumentosRaw);
			} else {
				setInstrumentos([]);
				console.log("Error: no hay instrumentos");
			}

			let categoriasRaw = await getData<Categoria[]>("http://localhost:8080/categoria");
			if (categoriasRaw) {
				setCategorias([{ id: 'all', denominacion: 'Todos' }, ...categoriasRaw]);
			} else {
				setCategorias([]);
				console.log("Error: no hay categorias");
			}
		};
		fetchData();
	}, [open]);

	const handleFilter = (denominacion: string) => {
		if (denominacion === 'Todos') {
			setInstrumentosFiltrados(instrumentos);
		} else {
			setInstrumentosFiltrados(instrumentos.filter((i) => i.categoria?.denominacion === denominacion));
		}
	};

	return (
		<Stack direction="column" height="75vh" justifyContent="space-between">
			<Stack
				style={{ alignItems: "center" }}
				sx={{
					fontFamily: "Roboto, sans-serif",
				}}
				height="90%"
				spacing={2}
				mt="1%"
			>
				<Stack direction="row" m="3%" spacing={2} alignItems="center">
					{categorias.map((c) => (
						<Button key={c.id} onClick={() => handleFilter(c.denominacion)}>
							{c.denominacion}
						</Button>
					))}
				</Stack>
				<CustomTable
					data={instrumentosFiltrados}
					handleSelection={handleSelection}
					handleDelete={handleDelete}
					handleOpen={handleOpen}
				/>
			</Stack>
			<Stack direction="row">
				<Button
					sx={{
						position: "absolute",
						top: "89%",
						left: "89%",
					}}

					variant="contained"

					onClick={() => {
						handleNew();
						handleOpen();
					}}
				>
					Crear
				</Button>
			</Stack>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						width: "50%",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: "10px",
					}}
				>
					<ModalInstrumento
						existingInstrumento={
							selectedInstrumento ? selectedInstrumento : undefined
						}
						onClose={handleClose}
					/>
				</Box>
			</Modal>
		</Stack>
	);
};
