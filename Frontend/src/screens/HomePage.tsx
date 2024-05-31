import { Typography, Box, Container, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Carrusel } from "../components/Carrusel";
import {Link} from "react-router-dom";

export const HomePage = () => {
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
				<Grid item xs={12} sm={6} md={4}>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="https://source.unsplash.com/random?instrument"
							alt="Instrumento 1"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Instrumento 1
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Descripción del instrumento 1.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="https://source.unsplash.com/random?guitar"
							alt="Instrumento 2"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Instrumento 2
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Descripción del instrumento 2.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="https://source.unsplash.com/random?music"
							alt="Instrumento 3"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Instrumento 3
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Descripción del instrumento 3.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
				<Button variant="contained" color="primary" size="large" component={Link} to="/productos">
					Ver Todos los Productos
				</Button>
			</Box>
		</Container>
	);
};
