import { Box, Button, Container, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import FBicon from "@/assets/Facebook_Logo_Primary.png";

import "./styles/header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
	return (
		<Container component="header" id="header">
			<NavLink to="/">
				<Typography variant="h1" component="h2" className="header-title">
					Suites Ordoñez
				</Typography>
			</NavLink>

			<Box className="header-info">
				<div className="contact">
					<div>
						<a href="tel:7444859626">Tel: (744) 485-9626</a>
						<a href="tel:7444856731">Tel: (744) 485-6731</a>
					</div>

					<a
						href="https://www.facebook.com/suitesordonez/"
						rel="noopener"
						target="_blank"
						className="fb-icon"
					>
						<img
							src={FBicon}
							style={{
								width: 32,
							}}
						/>
					</a>
				</div>

				<nav className="navbar">
					<ul>
						<li>
							<NavLink
								className={({ isActive }) => `${isActive ? "active" : ""}`}
								to="/about"
							>
								Nosotros
							</NavLink>
						</li>
						<li>
							<a href="/rooms">Habitaciones</a>
						</li>
						<li>
							<a href="/contact">Contacto</a>
						</li>
					</ul>
				</nav>

				<div className="actions">
					<Button variant="outlined">Ingresar</Button>
					<Button variant="contained">
						<ShoppingCartIcon />
					</Button>
				</div>
			</Box>
		</Container>
	);
};
