import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage } from "./screens/HomePage";
import { DondeEstamosPage } from "./screens/DondeEstamosPage";
import { ProductosPage } from "./screens/ProductosPage";
import { AdminPage } from "./screens/AdminPage.tsx";
import { CarritoProvider } from "./context/CarritoContext.tsx";
import Carrito from "./screens/Carrito.tsx";

function App() {

	return (
		<CarritoProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/donde-estamos" element={<DondeEstamosPage />} />
					<Route
						path="/productos"
						element={<ProductosPage />}
					/>
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/carrito" element={<Carrito />} />
				</Routes>
			</Router>
			</CarritoProvider>
	);
}

export default App;
