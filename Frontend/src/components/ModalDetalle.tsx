import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { Instrumento } from "../types/Instrumento";
import { useEffect, useState } from "react";
import { getInstrumentoById } from "../api/ApiInstrumento";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	bgcolor: "white",
	background: "white",
	borderRadius: "10px",
	padding: "3%",
	boxShadow: "0px 1px 0px rgba(0,0,0,0.2)",
};

interface ModalDetalleProps {
	open: boolean;
	instrumentoId: string;
	handleClose: () => void;
}

export const ModalDetalle: React.FC<ModalDetalleProps> = ({
	open,
	instrumentoId,
	handleClose,
}) => {
	const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			let instrumentos = await getInstrumentoById(instrumentoId);
			if (instrumentos) {
				setInstrumento(instrumentos);
			} else {
				setInstrumento(null);
				console.log("Error: no se encontró el instrumento");
			}
		};
		fetchData();
	}, []);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box height="65%" sx={style}>
				{instrumento ? (
					<Stack direction="row" height="100%">
						<Stack
							sx={{
								width: "55%",
								margin: "15px",
							}}
						>
							<Box>
								<Box display="flex" justifyContent="center">
									<img
										style={{
											padding: "24px",
											width: "40%",
										}}
										src={`${instrumento.imagen}`}
										alt={`${instrumento.instrumento}`}
									/>
								</Box>
								<Typography variant="h6"> Descripción </Typography>
								<Typography variant="body2">
									{instrumento.descripcion}
								</Typography>
							</Box>
						</Stack>
						<Box sx={{ borderLeft: "1px solid grey", m: "15px" }} />
						<Stack
							sx={{
								width: "45%",
								margin: "15px",
							}}
							direction="column"
							justifyContent="space-around"
						>
							<Box>
								<Typography variant="h5" mb="4%">
									{instrumento.instrumento}
								</Typography>
								<Typography variant="h3" mb="4%">
									$ {instrumento.precio}
								</Typography>
								<Typography variant="h6">Marca: {instrumento.marca}</Typography>
								<Typography variant="h6">
									Modelo: {instrumento.modelo}
								</Typography>
								{instrumento.costoEnvio === "G" ? (
									<Stack direction="row" alignItems="center">
										<Box mt="10%">
											<Typography>Costo Envío:</Typography>
											<Stack direction="row" fontStyle={{ color: "#00A650" }}>
												<LocalShippingOutlinedIcon
													style={{ fontSize: "25px" }}
												/>
												<Typography
													style={{
														marginLeft: 6,
													}}
												>
													Envío gratis a todo el país
												</Typography>
											</Stack>
										</Box>
									</Stack>
								) : (
									<Box
										mt="10%"
										style={{
											color: "#FF6638",
										}}
									>
										<Typography>
											Costo de envío Interior de Argentina $
											{instrumento.costoEnvio}
										</Typography>
									</Box>
								)}
							</Box>
							<Box>
								<Button variant="outlined">Agregar al Carrito</Button>
							</Box>
						</Stack>
					</Stack>
				) : (
					<Stack direction="row" height="100%">
						<Typography>
							No se encontró el instrumento. Intente denuevo más tarde
						</Typography>
					</Stack>
				)}
			</Box>
		</Modal>
	);
};
