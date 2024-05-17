import { Instrumento } from "./Instrumento";

export interface PedidoDetalle {
    instrumento: Instrumento;
    cantidad: number;
}