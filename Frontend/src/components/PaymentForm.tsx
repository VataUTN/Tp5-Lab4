import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";
import { MDBBtn } from "mdb-react-ui-kit";

export const PaymentForm = ({
                                handleComprar,
                            }: {
    handleComprar: () => void;
}) => {
    const { pedido } = useContext(CarritoContext);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    const handlePayment = async () => {
        const totalEnvio = pedido.detalles.reduce((total, detalle) => {
            if (detalle.instrumento.costoEnvio !== "G") {
                return total + parseFloat(detalle.instrumento.costoEnvio);
            } else {
                return total;
            }
        }, 0);

        const response = await fetch(
            "http://localhost:8080/mercadopago/create-preference",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: pedido.detalles.map((detalle) => ({
                        instrumento: detalle.instrumento.instrumento,
                        cantidad: detalle.cantidad,
                        precio: detalle.instrumento.precio,
                    })),
                    envio: totalEnvio
                }),
            }
        );

        const data = await response.json();
        if (data.preferenceId) {
            setPreferenceId(data.preferenceId);
            // Abrir la URL de pago de Mercado Pago en una nueva ventana
            window.open(`https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.preferenceId}`, '_blank');
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
