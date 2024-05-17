import { PedidoDetalle } from "./PedidoDetalle";

export interface Pedido {
    detalles: PedidoDetalle[];
    subtotal: number;
    fechaCreacion: Date;
}