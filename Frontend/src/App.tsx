import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage } from "./screens/HomePage";
import { DondeEstamosPage } from "./screens/DondeEstamosPage";
import { ProductosPage } from "./screens/ProductosPage";
import { AdminPage } from "./screens/AdminPage.tsx";

function App() {

	return (
		<>
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
				</Routes>
			</Router>
		</>
	);
}

export default App;
