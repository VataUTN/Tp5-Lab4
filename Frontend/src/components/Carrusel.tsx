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

const images = [
	{
		imgPath: "https://wallpapercave.com/wp/wp9291728.jpg",
	},
	{
		imgPath: "https://wallpapercave.com/wp/wp9291723.jpg",
	},
	{
		imgPath: "https://wallpapercave.com/wp/wp9291725.jpg",
	},
];

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
		<Box sx={{ flexGrow: 1 }}>
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
									overflow: "hidden",
									width: "100%",
								}}
								src={step.imgPath}
								alt={"algo salio mal"}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<Stack direction="row" justifyContent="space-between" mt="1%">
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					{theme.direction === "rtl" ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
					Back
				</Button>
				<Button
					size="small"
					onClick={handleNext}
					disabled={activeStep === maxSteps - 1}
				>
					Next
					{theme.direction === "rtl" ? (
						<KeyboardArrowLeft />
					) : (
						<KeyboardArrowRight />
					)}
				</Button>
			</Stack>
		</Box>
	);
};
