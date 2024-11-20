import { Container } from "@mui/material";
import CatalogService from "./components/CatalogService/CatalogService";
import CatalogSeason from "./components/CatalogSeason/CatalogSeason";
import CatalogSize from "./components/CatalogSize/CatalogSize";
import CatalogFloor from "./components/CatalogFloor/CatalogFloor";

const Catalogs = () => {
	return (
		<Container>
			<CatalogService />
			{/* <CatalogSeason />
			<CatalogSize />
			<CatalogFloor /> */}
		</Container>
	);
};

export default Catalogs;
