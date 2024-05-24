import { useContext, useState } from "react";
import { Button, Box } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";
import {MDBBtn} from "mdb-react-ui-kit";

export const PaymentForm = ({
                                handleComprar,
                            }: {
    handleComprar: () => void;
}) => {
    const { pedido } = useContext(CarritoContext);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    const handlePayment = async () => {
        const response = await fetch(
            "http://localhost:8080/mercadopago/create-preference",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    pedido.detalles.map((detalle) => ({
                        instrumento: detalle.instrumento.instrumento,
                        cantidad: detalle.cantidad,
                        precio: detalle.instrumento.precio,
                    }))
                ),
            }
        );

        const data = await response.json();
        if (data.preferenceId) {
            setPreferenceId(data.preferenceId);
            // Redirigir a la URL de pago de Mercado Pago en sandbox
            window.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.preferenceId}`;
        } else {
            console.error("Failed to get preferenceId:", data);
        }
    };

    return (
        <Box>
            <MDBBtn block size="lg" onClick={() => {
                handleComprar();
                handlePayment();
            }}>
                Ir a pagar
            </MDBBtn>
        </Box>
    );
};
