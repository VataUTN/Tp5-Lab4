import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Stack } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// Generar URLs de imágenes aleatorias
const generateRandomImages = (count: number) => {
	return Array.from({ length: count }, (_, index) => ({
		imgPath: `https://source.unsplash.com/random/800x600?sig=${index}&instrument`,
	}));
};

const images = generateRandomImages(5);

export const Carrusel: React.FC = () => {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", position: "relative" }}>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{images.map((step, index) => (
					<div key={step.imgPath}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component="img"
								sx={{
									display: "block",
									width: "100%",
									height: "400px", // Fijar la altura para que todas las imágenes tengan el mismo tamaño
									objectFit: "cover",
									borderRadius: 2,
								}}
								src={step.imgPath}
								alt={`Imagen ${index + 1}`}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<Stack direction="row" justifyContent="space-between" mt="2%" position="absolute" bottom="10px" width="100%">
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
					Back
				</Button>
				<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
					Next
					{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</Button>
			</Stack>
		</Box>
	);
};
