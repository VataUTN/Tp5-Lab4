import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import {HomePage} from "./screens/HomePage";
import {DondeEstamosPage} from "./screens/DondeEstamosPage";
import {ProductosPage} from "./screens/ProductosPage";
import {AdminPage} from "./screens/AdminPage.tsx";
import {CarritoProvider} from "./context/CarritoContext.tsx";
import Carrito from "./screens/Carrito.tsx";
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";
import {AuthProvider, useAuth} from "./context/AuthContext.tsx";
import {Suspense} from "react";

function App() {

    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
        const { isLoggedIn } = useAuth();
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    return (
        <AuthProvider>
            <CarritoProvider>
                <Router>
                    <Navbar/>
                    <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/donde-estamos" element={<DondeEstamosPage/>}/>
                        <Route
                            path="/productos"
                            element={<ProductosPage/>}
                        />
                        <Route path="/admin" element={<AdminPage/>}/>

                        <Route path="/carrito" element={<ProtectedRoute><Carrito/></ProtectedRoute>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                    </Suspense>
                </Router>
            </CarritoProvider>
        </AuthProvider>
    );
}

export default App;
