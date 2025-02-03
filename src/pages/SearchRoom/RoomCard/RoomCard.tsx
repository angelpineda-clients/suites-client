import { IRoom } from "@/interfaces/models/IRoom";
import {
	Box,
	Button,
	Container,
	Grid2 as Grid,
	Stack,
	Typography,
} from "@mui/material";
// icons
import PeopleIcon from "@mui/icons-material/People";
import KingBedIcon from "@mui/icons-material/KingBed";

import { useUiContext } from "@/context/ui/UiProvider";

import { useBookingStore } from "@/store/booking";

import formatNumberToPesosMX from "@/helpers/currencyFormat";

import CardImages from "@/components/ImageCarousel/CardImages";

import CardServices from "./CardServices";

import "./styles/room-card.css";
import Cart from "@/components/Cart/Cart";

const GRID_RESPONSIVE = { xs: 6, md: 4 };

const RoomCard = (data: IRoom = {} as IRoom) => {
	const setRomID = useBookingStore((store) => store.setRoomID);
	const {
		id,
		name,
		description,
		capacity,
		beds,
		price,
		size,
		floor,
		services,
		images,
	} = data;

	const { showDrawer } = useUiContext();

	function openDrawer() {
		setRomID(id);

		showDrawer({ children: <Cart room={data} /> });
	}

	return (
		<Container className="card-container animate__animated animate__fadeIn">
			<Box className="card">
				<Stack className="card-info" gap={2}>
					<Typography variant="h4" component="h4">
						{name}
					</Typography>

					<p>{description}</p>

					<Grid container>
						<Grid size={GRID_RESPONSIVE} className="card-grid-item">
							<span>Desde</span>

							<div className="info">
								<p>{formatNumberToPesosMX.format(price)}</p>
							</div>
						</Grid>

						<Grid size={GRID_RESPONSIVE} className="card-grid-item">
							<span>Capacidad</span>

							<div className="info">
								<PeopleIcon /> <p>{capacity}</p>
							</div>
						</Grid>

						<Grid size={GRID_RESPONSIVE} className="card-grid-item">
							<span>Camas</span>
							<div className="info">
								<KingBedIcon /> <p> {beds}</p>
							</div>
						</Grid>

						<Grid size={GRID_RESPONSIVE} className="card-grid-item">
							<span>Tamaño</span>
							<div className="info">
								<p>{size?.alias || size?.name}</p>
							</div>
						</Grid>

						<Grid size={GRID_RESPONSIVE} className="card-grid-item">
							<span>Piso</span>
							<div className="info">
								<p>{floor?.name}</p>
							</div>
						</Grid>

						<Grid size={12} className="card-grid-item">
							<span>Servicios</span>
							<div className="info">
								<CardServices services={services} />
							</div>
						</Grid>
					</Grid>
				</Stack>
				<Stack
					sx={{
						width: "45%",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<CardImages images={images} />
				</Stack>
			</Box>
			<Button variant="contained" className="btn-booking" onClick={openDrawer}>
				Reservar
			</Button>
		</Container>
	);
};

export default RoomCard;
