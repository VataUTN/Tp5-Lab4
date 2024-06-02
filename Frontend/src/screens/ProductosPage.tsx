import { Box, Button, Stack, Typography, Container, Paper } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Instrumento } from "../types/Instrumento";
import { ProductRow } from "../components/ProductRow";
import { useEffect, useState } from "react";
import { getData } from "../api/genericRequest";

const useStyles = makeStyles({
	root: {
		backgroundColor: "#f0f0f0",
		minHeight: "100vh",
		padding: 0,
		margin: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	container: {
		backgroundColor: "#ffffff",
		padding: "20px",
		boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
		borderRadius: "8px",
		marginTop: "20px",
	},
});

export const ProductosPage = () => {
	const classes = useStyles();
	const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			let instrumentos = await getData<Instrumento[]>('http://localhost:8080/instrumento');
			if (instrumentos) {
				setInstrumentos(instrumentos);
			} else {
				setInstrumentos([]);
				console.log("Error: no hay instrumentos");
			}
		};
		fetchData();
	}, []);

	const handleFilter = (categoria: string | null) => {
		setCategoriaSeleccionada(categoria);
	};

	const instrumentosFiltrados = categoriaSeleccionada
		? instrumentos.filter(instrumento => instrumento.categoria?.denominacion === categoriaSeleccionada)
		: instrumentos;

	return (
		<Box className={classes.root}>
			<Container maxWidth="lg" className={classes.container}>
				<Stack
					style={{ alignItems: "center" }}
					sx={{ fontFamily: "Roboto, sans-serif" }}
				>
					<Typography variant="h3" align="center" gutterBottom>
						Productos
					</Typography>
					<Stack direction="row" m="3%" spacing={2}>
						<Button variant="contained" onClick={() => handleFilter(null)}>Todos</Button>
						{instrumentos.reduce<string[]>((categorias, instrumento) => {
							const categoria = instrumento.categoria?.denominacion;
							if (categoria && !categorias.includes(categoria)) {
								categorias.push(categoria);
							}
							return categorias;
						}, []).map(categoria => (
							<Button
								key={categoria}
								variant="contained"
								onClick={() => handleFilter(categoria)}
							>
								{categoria}
							</Button>
						))}
					</Stack>
					{instrumentosFiltrados.map((instrumento, index) => (
						<Box key={index} width="85%" mb="2%">
							<ProductRow instrumento={instrumento} />
						</Box>
					))}
				</Stack>
			</Container>
		</Box>
	);
};
