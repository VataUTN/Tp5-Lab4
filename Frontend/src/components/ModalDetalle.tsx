import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { Instrumento } from "../types/Instrumento";
import { useContext, useEffect, useState } from "react";
import { getInstrumentoById } from "../api/ApiInstrumento";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { CarritoContext } from "../context/CarritoContext";

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
	overflow: "auto",
	maxHeight: "90vh",
};

interface ModalDetalleProps {
	open: boolean;
	instrumentoId: string;
	handleClose: () => void;
	showAgregarButton?: boolean; // New prop to control the visibility of the add button
}

export const ModalDetalle: React.FC<ModalDetalleProps> = ({
															  open,
															  instrumentoId,
															  handleClose,
															  showAgregarButton = true,
														  }) => {
	const { agregarAlCarrito } = useContext(CarritoContext);
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
	}, [instrumentoId]);

	const handleAgregarAlCarrito = () => {
		if (instrumento) {
			agregarAlCarrito({ instrumento, cantidad: 1 });
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				{instrumento ? (
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={2}
						height="100%"
					>
						<Stack
							sx={{
								width: { xs: "100%", md: "55%" },
								margin: "15px",
							}}
						>
							<Box>
								<Box display="flex" justifyContent="center">
									<img
										style={{
											padding: "24px",
											width: "100%",
											maxWidth: "300px",
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
						<Box sx={{ borderLeft: { md: "1px solid grey" }, m: "15px" }} />
						<Stack
							sx={{
								width: { xs: "100%", md: "45%" },
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
								<Typography variant="h6">Modelo: {instrumento.modelo}</Typography>
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
							{showAgregarButton && (
								<Box>
									<Button variant="outlined" onClick={handleAgregarAlCarrito}>
										Agregar al Carrito
									</Button>
								</Box>
							)}
						</Stack>
					</Stack>
				) : (
					<Stack direction="row" height="100%">
						<Typography>
							No se encontró el instrumento. Intente de nuevo más tarde
						</Typography>
					</Stack>
				)}
			</Box>
		</Modal>
	);
};
