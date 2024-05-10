import { Box, Typography, Paper } from "@mui/material";

export const DondeEstamosPage = () => {
	return (
		<Box display="flex" flexDirection='column' alignItems="center">
			<Typography variant="h3" p="3%">
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
				<Paper elevation={24} sx={{ borderRadius: 1 }}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4482425327956!2d-68.84314861194613!3d-32.88631510080801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Martín%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1712956735292!5m2!1ses-419!2sar"
						width="900"
						height="450"
						loading="lazy"
					></iframe>
				</Paper>
			</Box>
		</Box>
	);
};
