import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as React from "react";
import { CarritoContext } from "../context/CarritoContext";
import { PedidoDetalle } from "../types/PedidoDetalle";
import { useState } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaymentForm } from "../components/PaymentForm.tsx";
import { ModalDetalle } from "../components/ModalDetalle.tsx";
import { makeStyles } from '@mui/styles';

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
    card: {
        marginBottom: "20px",
    },
    cardHeader: {
        backgroundColor: "#e0e0e0",
    },
    totalCard: {
        marginTop: "20px",
    }
});

export default function Carrito() {
    const classes = useStyles();
    const [, setlastId] = useState<number | undefined>(0);
    const [, setShowMessage] = React.useState(false);
    const { pedido, removerDelCarrito, agregarAlCarrito, vaciarCarrito } = React.useContext(CarritoContext);

    const [selectedInstrumentoId, setSelectedInstrumentoId] = useState<string | null>(null);

    const handleOpen = (instrumentoId: string) => {
        setSelectedInstrumentoId(instrumentoId);
    };

    const handleClose = () => {
        setSelectedInstrumentoId(null);
    };
    const agruparDetallesPorInstrumento = (detalles: PedidoDetalle[]) => {
        return detalles.reduce((acumulador, detalle) => {
            const instrumentoId = detalle.instrumento.id;
            if (!acumulador[instrumentoId]) {
                acumulador[instrumentoId] = { ...detalle, cantidad: 0 };
            }
            acumulador[instrumentoId].cantidad += detalle.cantidad;
            return acumulador;
        }, {} as { [key: number]: PedidoDetalle });
    };

    const detallesAgrupados = agruparDetallesPorInstrumento(pedido.detalles);

    const actualizarCantidadVendida = async (instrumentoId: number, cantidad: number) => {
        try {
            const response = await fetch(`http://localhost:8080/instrumento/update-vendidos/${instrumentoId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cantidadVendida: cantidad }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al actualizar la cantidad vendida: ${errorText}`);
            }
            console.log(`Cantidad vendida actualizada para instrumento ${instrumentoId}: ${cantidad}`);
        } catch (error) {
            console.error(`Error actualizando la cantidad vendida para instrumento ${instrumentoId}:`, error);
        }
    };

    const handleComprar = async () => {
        if (pedido.detalles.length === 0) {
            toast.error("El carrito está vacío. Agrega productos antes de comprar.");
            return;
        }

        try {
            const totalEnvio = pedido.detalles.reduce((total, detalle) => {
                if (detalle.instrumento.costoEnvio !== "G") {
                    return total + parseFloat(detalle.instrumento.costoEnvio);
                } else {
                    return total;
                }
            }, 0);
            const totalPedido = pedido.subtotal + totalEnvio;
            const pedidoCompleto = {
                ...pedido,
                fechaPedido: new Date().toISOString().split("T")[0],
                totalPedido: totalPedido,
                detalles: pedido.detalles.map(detalle => ({
                    ...detalle,
                    pedido: null
                }))
            };
            const response = await fetch("http://localhost:8080/pedido/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedidoCompleto),
            });
            const data = await response.json();
            if (data) {
                setlastId(data.id);
                setShowMessage(true);
                toast.success(`El pedido con id ${data.id} se guardó correctamente`);
                for (const detalle of pedido.detalles) {
                    await actualizarCantidadVendida(detalle.instrumento.id, detalle.cantidad);
                }
                vaciarCarrito();
            } else {
                throw new Error('Error al guardar el pedido');
            }
        } catch (error) {
            setlastId(undefined);
            setShowMessage(true);
            toast.error("Hubo un error con la compra del pedido");
        }
    };

    return (
        <section className={classes.root}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className={classes.card}>
                            <MDBCardHeader className={`py-3`}>
                                <MDBTypography tag="h5" className="mb-0">
                                    Carrito
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {Object.values(detallesAgrupados).map((detalle, index) => (
                                    <MDBRow key={index}>
                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                       className="bg-image rounded hover-zoom hover-overlay">
                                                <img
                                                    src={detalle.instrumento.imagen}
                                                    className="w-100"
                                                    alt={detalle.instrumento.instrumento}
                                                    onClick={() => handleOpen(detalle.instrumento.id.toString())} // Use the instrument's ID to open the specific modal
                                                    style={{ cursor: 'pointer' }} // Add cursor pointer to indicate it's clickable
                                                />
                                            </MDBRipple>
                                        </MDBCol>

                                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                            <p>
                                                <strong>{detalle.instrumento.instrumento}</strong>
                                            </p>
                                            <p>Marca: {detalle.instrumento.marca}</p>
                                            <p>Modelo: {detalle.instrumento.modelo}</p>

                                            <div onClick={() => {
                                                for (let i = 0; i < detalle.cantidad; i++) {
                                                    removerDelCarrito(detalle.instrumento.id);
                                                }
                                            }}>
                                                <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2"
                                                            title="Eliminar producto">
                                                    <MDBIcon fas icon="trash" />
                                                </MDBTooltip>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                <MDBBtn className="px-3 me-2" onClick={() => {
                                                    if (detalle.cantidad > 1) {
                                                        removerDelCarrito(detalle.instrumento.id);
                                                    }
                                                }}>
                                                    <MDBIcon fas icon="minus" />
                                                </MDBBtn>

                                                <MDBInput value={detalle.cantidad} min={1} type="number" label="Cantidad" readOnly />

                                                <MDBBtn className="px-3 ms-2" onClick={() => {
                                                    const nuevoDetalle = { ...detalle, cantidad: 1 };
                                                    agregarAlCarrito(nuevoDetalle);
                                                }}>
                                                    <MDBIcon fas icon="plus" />
                                                </MDBBtn>
                                            </div>

                                            <p className="text-start text-md-center">
                                                <strong>${((detalle.instrumento.precio) * (detalle.cantidad))}</strong>
                                            </p>
                                        </MDBCol>
                                        <hr className="my-4" />
                                    </MDBRow>
                                ))}
                                {selectedInstrumentoId && (
                                    <ModalDetalle
                                        open={!!selectedInstrumentoId} // Modal is open if there's a selected instrument ID
                                        instrumentoId={selectedInstrumentoId}
                                        handleClose={handleClose}
                                        showAgregarButton={false} // Hide the add to cart button
                                    />
                                )}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className={`${classes.card} ${classes.totalCard}`}>
                            <MDBCardHeader >
                                <MDBTypography tag="h5" className="mb-0">
                                    Total
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Productos
                                        <span>${pedido.subtotal}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Envío
                                        <span>${pedido.detalles.reduce((total, detalle) => {
                                            if (detalle.instrumento.costoEnvio !== "G") {
                                                return total + parseFloat(detalle.instrumento.costoEnvio);
                                            } else {
                                                return total;
                                            }
                                        }, 0)}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Precio total</strong>
                                            <strong>
                                                <p className="mb-0">(no incluye impuestos)</p>
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>${pedido.detalles.reduce((total, detalle) => {
                                                if (detalle.instrumento.costoEnvio !== "G") {
                                                    return total + parseFloat(detalle.instrumento.costoEnvio);
                                                } else {
                                                    return total;
                                                }
                                            }, 0) + pedido.subtotal}</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>

                                <PaymentForm handleComprar={handleComprar} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastContainer />
        </section>

    );
}
