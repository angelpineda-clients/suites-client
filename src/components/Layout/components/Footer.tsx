import FBicon from "@/assets/Facebook_Logo_Primary.png";
import { NavLink } from "react-router-dom";

import "./styles/footer.css";
import { Button } from "@mui/material";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="contact">
				<div>
					<a href="tel:7444859626">Tel: (744) 485-9626</a>
					<a href="tel:7444856731">Tel: (744) 485-6731</a>
					<a href="mailto:suitesordonez@hotmail.com">
						suitesordonez@hotmail.com.
					</a>
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
			<Button variant="contained">Reservar</Button>
		</footer>
	);
};

export default Footer;
