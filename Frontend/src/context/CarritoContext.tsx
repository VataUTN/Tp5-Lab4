import React, { createContext, useState } from "react";
import { Pedido } from "../types/Pedido";
import { PedidoDetalle } from "../types/PedidoDetalle";

interface CarritoContextProps {
    pedido: Pedido;
    agregarAlCarrito: (detalle: PedidoDetalle) => void;
    removerDelCarrito: (instrumentoId: number) => void;
    vaciarCarrito:()=>void;
}

export const CarritoContext = createContext<CarritoContextProps>({
        agregarAlCarrito(): void {
        }, pedido: undefined, removerDelCarrito(): void {
        }, vaciarCarrito(): void {
        }

    }
);

export const CarritoProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [pedido, setPedido] = useState<Pedido>({
        detalles: [],
        subtotal: 0,
        fechaCreacion: new Date(),
    });

    const agregarAlCarrito = (detalle: PedidoDetalle) => {
        setPedido((prevPedido) => {
            const nuevoDetalle = prevPedido.detalles.find(
                (d) => d.instrumento.id === detalle.instrumento.id
            );
            if (nuevoDetalle) {
                nuevoDetalle.cantidad += detalle.cantidad;
            } else {
                prevPedido.detalles.push(detalle);
            }
            const nuevoSubtotal = prevPedido.detalles.reduce(
                (total, d) => total + d.instrumento.precio * d.cantidad,
                0
            );
            return {
                detalles: [...prevPedido.detalles],
                subtotal: nuevoSubtotal,
                fechaCreacion: new Date(),
            };
        });
    };

    const removerDelCarrito = (instrumentoId: number) => {
        setPedido((prevPedido) => {
            const detalleARemover = prevPedido.detalles.find(
                (detalle) => detalle.instrumento.id === instrumentoId
            );
            if (!detalleARemover) return prevPedido;

            detalleARemover.cantidad -= 1;
            if (detalleARemover.cantidad <= 0) {
                prevPedido.detalles = prevPedido.detalles.filter(
                    (detalle) => detalle.instrumento.id !== instrumentoId
                );
            }
            const nuevoSubtotal = prevPedido.detalles.reduce(
                (total, d) => total + d.instrumento.precio * d.cantidad,
                0
            );
            return {
                detalles: [...prevPedido.detalles],
                subtotal: nuevoSubtotal,
                fechaCreacion: new Date(),
            };
        });
    };

    const vaciarCarrito = () => {

        setPedido({detalles: [],
            subtotal: 0,
            fechaCreacion: new Date(),})
    }

    return (
        <CarritoContext.Provider
            value={{ pedido, agregarAlCarrito, removerDelCarrito, vaciarCarrito}}
        >
            {children}
        </CarritoContext.Provider>
    );
};