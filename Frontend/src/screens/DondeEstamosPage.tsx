import { Box, Typography, Paper, Container } from "@mui/material";
import { makeStyles } from '@mui/styles';

// Estilos para asegurarnos que el fondo del body sea gris
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

export const DondeEstamosPage = () => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Container maxWidth="lg" className={classes.container} sx={{ mt: 4 }}>
				<Typography variant="h3" align="center" gutterBottom >
					Dónde Estamos
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						overflow: "hidden",
					}}
				>
					<Paper>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4482425327956!2d-68.84314861194613!3d-32.88631510080801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Martín%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1712956735292!5m2!1ses-419!2sar"
							width="900"
							height="450"
							loading="lazy"
							style={{ border: 0 }}
							allowFullScreen=""
							aria-hidden="false"
							tabIndex="0"
						></iframe>
					</Paper>
				</Box>
			</Container>
		</Box>
	);
};
