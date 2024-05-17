import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Navbar() {

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (

		<Box sx={{ width: "100%" }}>

			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>

				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>

					<Tab label="Home" component={Link} to="/" {...a11yProps(0)} />

					<Tab
						label="Donde Estamos"
						component={Link}
						to="/donde-estamos"
						{...a11yProps(1)}
					/>
					<Tab
						label="Productos"
						component={Link}
						to="/productos"
						{...a11yProps(2)}
					/>
					<Tab
						label="Carrito"
						component={Link}
						to="/carrito"
						{...a11yProps(2)}
					/>
					<Tab
						label="Admin"
						component={Link}
						to="/admin"
						{...a11yProps(3)}
						style={{ marginLeft: 'auto' }}
					/>
				</Tabs>
			</Box>

		</Box>
	);
}
