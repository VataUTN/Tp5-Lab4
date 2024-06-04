import React, { useEffect, useState } from "react";
import {
	Typography,
	Box,
	Container,
} from "@mui/material";
import { Carrusel } from "../components/Carrusel";

import {makeStyles} from '@mui/styles';
import BarChartComponent from "../components/charts/BarChartComponent.tsx";

const useStyles = makeStyles({
	root: {
		backgroundColor: "#f0f0f0",
		minHeight: "100vh",
		padding: 0,
		margin: 0,
		display: "flex",
		flexDirection: "column",
	},
	container: {
		backgroundColor: "#ffffff",
		padding: "20px",
		boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
		borderRadius: "8px",
		marginTop: "20px",
	},
});

export const HomePage = () => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Container maxWidth="lg" className={classes.container} sx={{ mt: 4 }}>
				<Typography variant="h2" align="center" gutterBottom>
					Musical Hendrix
				</Typography>
				<Box sx={{ py: 4 }}>
					<Carrusel />
				</Box>

				<Typography variant="body1" align="center" color="textSecondary" paragraph sx={{ my: 4 }}>
					Musical Hendrix es una tienda de instrumentos musicales con ya más de 15
					años de experiencia. Tenemos el conocimiento y la capacidad como para
					informarte acerca de las mejores elecciones para tu compra musical.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ducimus
					earum tempore accusamus eum tenetur omnis est eligendi, laborum hic quae
					explicabo, voluptate quam? Quibusdam commodi nostrum ipsa quidem est?
				</Typography>
			</Container>
		</Box>
	);
};
