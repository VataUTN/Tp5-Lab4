import React, { useEffect, useState } from "react";
import {
	Typography, Box, Container, Grid, Card, CardContent, CardMedia, Button
} from "@mui/material";
import { Carrusel } from "../components/Carrusel";
import { Link } from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
	const [masVendidos, setMasVendidos] = useState([]);

	useEffect(() => {
		const fetchMasVendidos = async () => {
			try {
				const response = await axios.get("http://localhost:8080/instrumento/masVendidos");
				setMasVendidos(response.data.slice(0, 3));
			} catch (error) {
				console.error("Error fetching most sold instruments", error);
			}
		};

		fetchMasVendidos();
	}, []);

	return (
		<Container maxWidth="lg" sx={{ mt: 4 }}>
			<Typography variant="h2" align="center" gutterBottom>
				Musical Hendrix
			</Typography>
			<Carrusel />
			<Typography variant="body1" align="center" color="textSecondary" paragraph sx={{ my: 4 }}>
				Musical Hendrix es una tienda de instrumentos musicales con ya más de 15
				años de experiencia. Tenemos el conocimiento y la capacidad como para
				informarte acerca de las mejores elecciones para tu compra musical.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ducimus
				earum tempore accusamus eum tenetur omnis est eligendi, laborum hic quae
				explicabo, voluptate quam? Quibusdam commodi nostrum ipsa quidem est?
			</Typography>

			<Typography variant="h4" align="center" gutterBottom>
				Destacados
			</Typography>
			<Grid container spacing={4}>
				{masVendidos.map((instrumento, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
							<CardMedia
								component="img"
								height="140"
								image={instrumento.imagen}
								alt={instrumento.instrumento}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant="h5" component="div" noWrap>
									{instrumento.instrumento}
								</Typography>
								<Typography variant="body2" color="textSecondary" noWrap>
									Vendidos: {instrumento.cantidadVendida}
								</Typography>
								<Typography variant="body2" color="textSecondary" noWrap>
									Precio: ${instrumento.precio}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
				<Button variant="contained" color="primary" size="large" component={Link} to="/productos">
					Ver Todos los Productos
				</Button>
			</Box>
		</Container>
	);
};
