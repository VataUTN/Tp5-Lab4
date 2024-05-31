import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Navbar() {
	const { isLoggedIn, username, role, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [value, setValue] = React.useState(0);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	React.useEffect(() => {
		switch (location.pathname) {
			case "/":
				setValue(0);
				break;
			case "/donde-estamos":
				setValue(1);
				break;
			case "/productos":
				setValue(2);
				break;
			case "/carrito":
				setValue(3);
				break;
			case "/admin":
				setValue(5);
				break;
			default:
				setValue(0);
		}
	}, [location.pathname]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					sx={{ display: 'flex', alignItems: 'center' }}
				>
					<Tab label="Home" component={Link} to="/" {...a11yProps(0)} />
					<Tab label="Donde Estamos" component={Link} to="/donde-estamos" {...a11yProps(1)} />
					<Tab label="Productos" component={Link} to="/productos" {...a11yProps(2)} />
					<Tab label="Carrito" component={Link} to="/carrito" {...a11yProps(3)} />
					<Box sx={{ flexGrow: 1 }} />
					{isLoggedIn && role === 'Admin' && (
						<Tab label="Admin" component={Link} to="/admin" {...a11yProps(4)} />
					)}
					<IconButton
						size="large"
						edge="end"
						color="inherit"
						onClick={handleMenuOpen}
						sx={{ mr: "1%" }}
					>
						<AccountCircleIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						sx={{ mt: '1%' }}
					>
						{isLoggedIn ? (
							<>
								<MenuItem disabled>{username} ({role})</MenuItem>
								<MenuItem onClick={() => {
									handleLogout();
									handleMenuClose();
								}}>Logout</MenuItem>
							</>
						) : (
							<>
								<MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
								<MenuItem component={Link} to="/register" onClick={handleMenuClose}>Register</MenuItem>
							</>
						)}
					</Menu>
				</Tabs>
			</Box>
		</Box>
	);
}
