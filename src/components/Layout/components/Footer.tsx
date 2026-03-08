import FBicon from "@/assets/images/Facebook_Logo_Primary.png";
import {
	ContactStack,
	FooterContainer,
	FooterContent,
	FooterRoot,
	NavItem,
	NavLinks,
	SocialButton,
	SocialImage,
} from "./Footer.styled";
import { Button, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
	return (
		<FooterRoot>
			<FooterContainer maxWidth={false} disableGutters>
				<FooterContent>
					<ContactStack>
						<Stack spacing={0.5}>
							<Link href="tel:7444859626" underline="hover" color="inherit">
								Tel: (744) 485-9626
							</Link>
							<Link href="tel:7444856731" underline="hover" color="inherit">
								Tel: (744) 485-6731
							</Link>
							<Link href="mailto:suitesordonez@hotmail.com" underline="hover" color="inherit">
								suitesordonez@hotmail.com
							</Link>
						</Stack>
						<SocialButton href="https://www.facebook.com/suitesordonez/" rel="noopener" target="_blank">
							<SocialImage src={FBicon} alt="Facebook" />
						</SocialButton>
					</ContactStack>

					<NavLinks>
						<Typography component={NavItem} to="/about">
							Nosotros
						</Typography>
						<Typography component={NavItem} to="/rooms">
							Habitaciones
						</Typography>
						<Typography component={NavItem} to="/contact">
							Contacto
						</Typography>
					</NavLinks>

					<Button variant="contained">Reservar</Button>
				</FooterContent>
			</FooterContainer>
		</FooterRoot>
	);
};

export default Footer;
