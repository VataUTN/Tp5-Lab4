import { Instrumento } from "../types/Instrumento";

export const getAllInstrumentos = async (): Promise<Instrumento[] | null> => {
	try {
		const response = await fetch("http://localhost:8080/instrumento");
		const data = await response.json();
		return data as Instrumento[];
	} catch (error) {
		console.error("Error fetching data:", error);
        return null;
	}
};

export const getInstrumentoById = async (id: string): Promise<Instrumento | null> => {
	try {
		const response = await fetch(`http://localhost:8080/instrumento/${id}`);
		const data = await response.json();
		return data as Instrumento;
	} catch (error) {
		console.error("Error fetching data:", error);
        return null;
	}
};
