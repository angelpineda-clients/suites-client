import { Container } from "@mui/material";
import HomeForm from "./components/HomeForm";

const Home = () => {
	return (
		<Container sx={{ minHeight: "70vh" }}>
			<HomeForm />
		</Container>
	);
};

export default Home;
