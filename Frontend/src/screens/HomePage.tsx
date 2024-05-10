import { Typography } from "@mui/material";
import { Carrusel } from "../components/Carrusel";

export const HomePage = () => {
	return (
		<>
			<Typography variant="h1" p="1%">
				Musical Hendrix
			</Typography>
			<Carrusel />
			<Typography variant="body1" p="2%">
				Musical Hendrix es una tienda de instrumentos musicales con ya más de 15
				años de experiencia. Tenemos el conocimiento y la capacidad como para
				informarte acerca de las mejores elecciones para tu compra musical.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ducimus
				earum tempore accusamus eum tenetur omnis est eligendi, laborum hic quae
				explicabo, voluptate quam? Quibusdam commodi nostrum ipsa quidem est?
			</Typography>
		</>
	);
};
