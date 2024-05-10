import { Box, Button, Stack, Typography } from "@mui/material";
import { Instrumento } from "../types/Instrumento";
import { ProductRow } from "../components/ProductRow";
import { useEffect, useState } from "react";
import { getData } from "../api/genericRequest";

export const ProductosPage = () => {
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
		<>
			<Stack
				style={{ alignItems: "center" }}
				sx={{
					fontFamily: "Roboto, sans-serif",
				}}
			>

				<Stack direction="row" m="3%" >
					<Button onClick={() => handleFilter(null)}>Todos</Button> {/* Botón para mostrar todos los instrumentos */}
					{/* Botones para cada categoría */}
					{instrumentos.reduce<string[]>((categorias, instrumento) => {
						const categoria = instrumento.categoria?.denominacion;
						if (categoria && !categorias.includes(categoria)) {
							categorias.push(categoria);
						}
						return categorias;
					}, []).map(categoria => (
						<Button key={categoria} onClick={() => handleFilter(categoria)}>{categoria}</Button>
					))}
				</Stack>
				{instrumentosFiltrados.map((instrumento, index) => (
					<Box key={index} width="85%" mb="2%">
						<ProductRow instrumento={instrumento} />
					</Box>
				))}
			</Stack>
		</>
	);
};
