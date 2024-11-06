import { Container } from "@mui/material";
import CatalogService from "./components/CatalogService/CatalogService";
import CatalogSeason from "./components/CatalogSeason/CatalogSeason";

const Catalogs = () => {
	return (
		<Container>
			<CatalogService />
			<CatalogSeason />
		</Container>
	);
};

export default Catalogs;
