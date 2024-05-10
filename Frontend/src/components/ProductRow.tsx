import { FC, useState } from "react";
import { Instrumento } from "../types/Instrumento";
import { Button, Card, Stack } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { ModalDetalle } from "./ModalDetalle";

export const ProductRow: FC<{ instrumento: Instrumento }> = ({
                                                                 instrumento,
                                                             }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card sx={{ width: "100%", boxShadow: "0px 1px 0px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
                <img
                    style={{
                        maxWidth: "224px",
                        maxHeight: "224px",
                        marginRight: "16px",
                    }}
                    src={`${instrumento.imagen}`}
                    alt={`${instrumento.instrumento}`}
                />
                <Stack flexGrow={1} sx={{ alignItems: "flex-start" }}>
                    <h2>{instrumento.instrumento}</h2>
                    <Stack spacing={1}>
                        <span style={{ fontSize: "24px", fontWeight: "normal" }}>
                            $ {instrumento.precio}
                        </span>
                        {instrumento.costoEnvio === "G" ? (
                            <Stack direction="row" alignItems="center" sx={{ color: "#00A650" }}>
                                <LocalShippingOutlinedIcon style={{ fontSize: "25px", marginRight: "6px" }} />
                                <span>Envío gratis a todo el país</span>
                            </Stack>
                        ) : (
                            <span style={{ color: "#FF6638" }}>
                                Costo de envío Interior de Argentina ${instrumento.costoEnvio}
                            </span>
                        )}
                        <span style={{ fontSize: "16px", marginBottom: "20px" }}>
                            {instrumento.cantidadVendida} vendidos
                        </span>
                    </Stack>
                </Stack>
                <Stack justifyContent="flex-end">
                    <Button
                        sx={{
                            mb: "10px",
                            mr: "25px",
                        }}
                        onClick={handleOpen}
                    >
                        Ver Detalle
                    </Button>
                    <ModalDetalle open={open} instrumentoId={instrumento.id.toString()} handleClose={handleClose} />
                </Stack>
            </div>
        </Card>
    );
};
