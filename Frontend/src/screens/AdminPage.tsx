import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, Stack, Typography, TextField } from "@mui/material";
import { Instrumento } from "../types/Instrumento";
import { Categoria } from "../types/Categoria";
import CustomTable from "../components/CustomTable";
import { ModalInstrumento } from "../components/ModalInstrumento";
import { makeStyles } from '@mui/styles';
import { saveAs } from 'file-saver';
import dayjs from "dayjs";
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { getData, deleteData } from "../api/genericRequest";

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
	button: {
		backgroundColor: "#1976d2",
		color: "#ffffff",
		'&:hover': {
			backgroundColor: "#115293",
		},
	},
	modal: {
		width: "50%",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#fff",
		boxShadow: 24,
		padding: "16px",
		borderRadius: "10px",
	},
	filterButton: {
		margin: "5px",
	}
});

const formattedDate = (date: string | Date) => {
	const d = new Date(date);
	let month = '' + (d.getMonth() + 1);
	let day = '' + d.getDate();
	const year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

export const AdminPage = () => {
	const classes = useStyles();
	const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
	const [instrumentosFiltrados, setInstrumentosFiltrados] = useState<Instrumento[]>([]);
	const [selectedInstrumento, setselectedInstrumento] = useState<Instrumento | undefined>(undefined);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [chartModalOpen, setChartModalOpen] = useState(false);
	const [pieChartModalOpen, setPieChartModalOpen] = useState(false);
	const [fechaDesde, setFechaDesde] = useState();
	const [fechaHasta, setFechaHasta] = useState();
	const [excelModalOpen, setExcelModalOpen] = useState(false);
	const [pedidos, setPedidos] = useState<any[]>([]);
	const currentYear = new Date().getFullYear();
	const [datasetBar, setDatasetBar] = useState<any[]>([]);
	const [datasetPie, setDatasetPie] = useState<any[]>([]);

	const fechaDesdeGrafico = `${currentYear}-01-01`;
	const fechaHastaGrafico = `${currentYear}-12-31`;

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

	useEffect(() => {
		const fetchData = async () => {
			const pedidos = await getData<any[]>(
				`http://localhost:8080/pedido/filter-by-date?fechaDesde=${formattedDate(
					fechaDesdeGrafico
				)}&fechaHasta=${formattedDate(fechaHastaGrafico)}`
			);
			if (pedidos) {
				setPedidos(pedidos);
				const barData = generateBarData(pedidos);
				setDatasetBar(barData);
				const pieData = generatePieData(pedidos);
				setDatasetPie(pieData);
			} else {
				setPedidos([]);
				console.log("Error: no hay pedidos");
			}
		};
		fetchData();
	}, [fechaDesdeGrafico, fechaHastaGrafico]);

	const generateBarData = (pedidos: any[]) => {
		const meses = [
			"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
		];
		return meses.map((mes, index) => {
			const pedidosFiltrados = pedidos.filter((pedido) => {
				const fechaPedido = dayjs(pedido.fechaPedido);
				return fechaPedido.isAfter(dayjs(fechaDesdeGrafico).subtract(1, 'day')) &&
					fechaPedido.isBefore(dayjs(fechaHastaGrafico).add(1, 'day')) &&
					fechaPedido.month() === index;
			});
			return { mes, cantidadPedidos: pedidosFiltrados.length };
		});
	};

	const generatePieData = (pedidos: any[]) => {
		const instrumentos = pedidos.flatMap((p) => p.detalles.map((d) => d.instrumento.instrumento));
		const uniqueInstrumentos = Array.from(new Set(instrumentos));
		return uniqueInstrumentos.map((instrumento) => {
			const value = pedidos.reduce((acc, p) => {
				return acc + p.detalles.reduce((accD, d) => {
					return d.instrumento.instrumento === instrumento ? accD + d.cantidad : accD;
				}, 0);
			}, 0);
			return { label: instrumento, value };
		});
	};

	const handleGenerateExcel = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/report/excel?fechaDesde=${formattedDate(fechaDesde)}&fechaHasta=${formattedDate(fechaHasta)}`
			);
			const blob = await response.blob();
			saveAs(blob, "report.xlsx");
		} catch (error) {
			console.error("Error generating Excel report:", error);
		}
	};

	const isValidDateRange = () => {
		const today = dayjs();
		const from = dayjs(fechaDesde);
		const to = dayjs(fechaHasta);
		return from.isValid() && to.isValid() && !from.isAfter(to) && !to.isAfter(today);
	};

	return (
		<Stack className={classes.root} direction="column" height="75vh" justifyContent="space-between">
			<Stack
				className={classes.container}
				style={{ alignItems: "center" }}
				sx={{ fontFamily: "Roboto, sans-serif" }}
				height="90%"
				spacing={2}
				mt="1%"
			>
				<Stack direction="row" m="3%" spacing={2} alignItems="center">
					{categorias.map((c) => (
						<Button key={c.id} onClick={() => handleFilter(c.denominacion)} className={classes.filterButton}>
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
				<Stack direction="row" spacing={2} mt={2}>
					<Button className={classes.button} onClick={() => setChartModalOpen(true)}>Gráfico de Barras</Button>
					<Button className={classes.button} onClick={() => setPieChartModalOpen(true)}>Gráfico de Torta</Button>
					<Button className={classes.button} onClick={() => setExcelModalOpen(true)}>Exportar a Excel</Button>
				</Stack>
			</Stack>
			<Stack direction="row">
				<Button
					className={classes.button}
					sx={{ position: "absolute", top: "89%", left: "89%" }}
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
				<Box className={classes.modal}>
					<ModalInstrumento existingInstrumento={selectedInstrumento ? selectedInstrumento : undefined} onClose={handleClose} />
				</Box>
			</Modal>
			<Modal open={chartModalOpen} onClose={() => setChartModalOpen(false)}>
				<Box className={classes.modal}>
					<Bar
						data={{
							labels: datasetBar.map((data) => data.mes),
							datasets: [{
								label: 'Cantidad de Pedidos',
								data: datasetBar.map((data) => data.cantidadPedidos),
								backgroundColor: 'rgba(75, 192, 192, 0.6)',
								borderColor: 'rgba(75, 192, 192, 1)',
								borderWidth: 1,
							}]
						}}
						options={{ responsive: true, maintainAspectRatio: false }}
					/>
				</Box>
			</Modal>
			<Modal open={pieChartModalOpen} onClose={() => setPieChartModalOpen(false)}>
				<Box className={classes.modal}>
					<Pie
						data={{
							labels: datasetPie.map((data) => data.label),
							datasets: [{
								label: 'Cantidad de Instrumentos',
								data: datasetPie.map((data) => data.value),
								backgroundColor: [
									'rgba(255, 99, 132, 0.6)',
									'rgba(54, 162, 235, 0.6)',
									'rgba(255, 206, 86, 0.6)',
									'rgba(75, 192, 192, 0.6)',
									'rgba(153, 102, 255, 0.6)',
									'rgba(255, 159, 64, 0.6)',
								],
								borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)',
								],
								borderWidth: 1,
							}]
						}}
						options={{ responsive: true, maintainAspectRatio: false }}
					/>
				</Box>
			</Modal>
			<Modal open={excelModalOpen} onClose={() => setExcelModalOpen(false)}>
				<Box className={classes.modal}>
					<Typography variant="h6">Seleccionar rango de fechas</Typography>
					<Stack direction="row" spacing={2} mt={2}>
						<TextField
							label="Fecha Desde"
							type="date"
							InputLabelProps={{ shrink: true }}
							value={fechaDesde}
							onChange={(e) => setFechaDesde(e.target.value)}
							error={!fechaDesde}
							helperText={!fechaDesde ? "Campo requerido" : ""}
						/>
						<TextField
							label="Fecha Hasta"
							type="date"
							InputLabelProps={{ shrink: true }}
							value={fechaHasta}
							onChange={(e) => setFechaHasta(e.target.value)}
							error={!fechaHasta}
							helperText={!fechaHasta ? "Campo requerido" : ""}
						/>
					</Stack>
					<Button
						className={classes.button}
						onClick={() => {

							handleGenerateExcel();
							setExcelModalOpen(false);

						}}
					>
						Confirmar y Exportar
					</Button>
				</Box>
			</Modal>
		</Stack>
	);
};
