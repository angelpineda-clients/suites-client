import { Container } from "@mui/material";
import CatalogService from "./components/CatalogService/CatalogService";
import CatalogSeason from "./components/CatalogSeason/CatalogSeason";
import CatalogSize from "./components/CatalogSize/CatalogSize";

const Catalogs = () => {
	return (
		<Container>
			<CatalogService />
			<CatalogSeason />
			<CatalogSize />
		</Container>
	);
};

export default Catalogs;
