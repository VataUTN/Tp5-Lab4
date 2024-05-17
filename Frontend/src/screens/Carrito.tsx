import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as React from "react";
import {CarritoContext} from "../context/CarritoContext";
import {PedidoDetalle} from "../types/PedidoDetalle";
import {useState} from "react";
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
import {Pedido} from "../types/Pedido.ts";


export default function Carrito() {
    const [lastId, setlastId] = useState<number | undefined>(0);

    const [showMessage, setShowMessage] = React.useState(false);
    const handleCloseMessage = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setShowMessage(false);
    };

    const {pedido, removerDelCarrito, agregarAlCarrito, vaciarCarrito} = React.useContext(CarritoContext);
const [totalenvio,setTotalEnvio] = useState<number>();
    const agruparDetallesPorInstrumento = (detalles: PedidoDetalle[]) => {
        return detalles.reduce((acumulador, detalle) => {
            const instrumentoId = detalle.instrumento.id;
            if (!acumulador[instrumentoId]) {
                acumulador[instrumentoId] = {...detalle, cantidad: 0};
            }
            acumulador[instrumentoId].cantidad += detalle.cantidad;
            return acumulador;
        }, {} as { [key: number]: PedidoDetalle });
    };

    const detallesAgrupados = agruparDetallesPorInstrumento(pedido.detalles);

    const handleComprar = async () => {
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
                fechaPedido: new Date().toISOString().split("T")[0], // Agrega la fecha actual
                totalPedido: totalPedido, // Agrega el subtotal como total
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
            }
            vaciarCarrito()
        } catch (error) {
            setlastId(undefined);
            setShowMessage(true);
        }
    };

    const realizarPedido = async () => {
        // Aquí puedes preparar los datos del pedido para enviar al backend
        const totalEnvio = pedido.detalles.reduce((total, detalle) => {
            if (detalle.instrumento.costoEnvio !== "G") {
                return total + parseFloat(detalle.instrumento.costoEnvio);
            } else {
                return total;
            }
        }, 0);
        const totalPedido = pedido.subtotal + totalEnvio;
        const pedido: Pedido = {
            fechaPedido: new Date(),
            totalPedido: totalPedido,
            detalles: pedido.map(({ id, cantidad, precio, instrumento, marca, modelo, imagen, costoEnvio, cantidadVendida, descripcion, categoria }): PedidoDetalle => ({
                cantidad: cantidad,
                instrumento: { id, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion, categoria },
            })),
        };
        await postData<Pedido>("http://localhost:8080/pedido/create", pedido);
        console.log(pedido);
    };
    return (
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    Carrito
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {Object.values(detallesAgrupados).map((detalle, index) => (
                                    <MDBRow>
                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                       className="bg-image rounded hover-zoom hover-overlay">
                                                <img
                                                    src={detalle.instrumento.imagen}
                                                    className="w-100"/>
                                                <a href="#!">
                                                    <div className="mask"
                                                         style={{backgroundColor: "rgba(251, 251, 251, 0.2)",}}>
                                                    </div>
                                                </a>
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
                                                <MDBTooltip wrapperProps={{size: "sm"}} wrapperClass="me-1 mb-2"
                                                            title="Eliminar producto">

                                                    <MDBIcon fas icon="trash"/>

                                                </MDBTooltip>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                            <div className="d-flex mb-4" style={{maxWidth: "300px"}}>
                                                <MDBBtn className="px-3 me-2" onClick={() => {
                                                    if (detalle.cantidad > 1) {
                                                        removerDelCarrito(detalle.instrumento.id);
                                                    }
                                                }}>
                                                    <MDBIcon fas icon="minus"/>
                                                </MDBBtn>

                                                <MDBInput value={detalle.cantidad} min={1} type="number" label="Cantidad"/>

                                                <MDBBtn className="px-3 ms-2" onClick={() => {
                                                    const nuevoDetalle = { ...detalle, cantidad: 1 };
                                                    agregarAlCarrito(nuevoDetalle);
                                                }}>
                                                    <MDBIcon fas icon="plus"/>
                                                </MDBBtn>
                                            </div>

                                            <p className="text-start text-md-center">
                                                <strong>${((detalle.instrumento.precio)*(detalle.cantidad))}</strong>
                                            </p>
                                        </MDBCol>
                                        <hr className="my-4"/>
                                    </MDBRow>
                                ))}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
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
                                                const temp = total + parseFloat(detalle.instrumento.costoEnvio);

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

                                <MDBBtn block size="lg" onClick={handleComprar}>
                                    Ir a pagar
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}