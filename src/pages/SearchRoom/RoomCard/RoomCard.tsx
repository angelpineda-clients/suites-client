import { IRoom } from "@/interfaces/models/IRoom";
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
// icons
import PeopleIcon from "@mui/icons-material/People";
import KingBedIcon from "@mui/icons-material/KingBed";

import "./styles/room-card.css";
import CardServices from "./CardServices";

const GRID_RESPONSIVE = { xs: 6, md: 4 };

const RoomCard = (data: IRoom = {} as IRoom) => {
	const {
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
	return (
		<Box className="card">
			<Stack className="text" gap={2}>
				<Typography variant="h4" component="h4">
					{name}
				</Typography>

				<p>{description}</p>

				<Grid container>
					<Grid size={GRID_RESPONSIVE} className="card-grid-item">
						<span>Desde</span>

						<div className="info">
							<p>${price}</p>
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
					width: "50%",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<img
					src={images[0]?.url}
					alt={`${name}-${images[0]?.id}`}
					style={{
						borderRadius: "8px",
						border: "thin solid gray",
						aspectRatio: "16/9",
						width: "100%",
						minHeight: "200px",
						maxWidth: "400px",
					}}
				/>
				<Button variant="outlined"> Reservar </Button>
			</Stack>
		</Box>
	);
};

export default RoomCard;
