import { Container, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const FooterRoot = styled("footer")(() => ({
	width: "100%",
	background:
		"linear-gradient(360deg, rgba(38, 184, 188, 1) 0%, rgba(140, 214, 211, 0.7) 40%, rgba(255, 247, 237, 0.4) 100%)",
	paddingTop: 16,
	paddingBottom: 16,
}));

export const FooterContainer = styled(Container)(() => ({
	paddingLeft: 16,
	paddingRight: 16,
}));

export const FooterContent = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	justifyContent: "space-between",
	alignItems: "flex-start",
	minHeight: 150,
	[theme.breakpoints.up("md")]: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing(3),
	},
}));

export const ContactStack = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(1.5),
}));

export const SocialButton = styled(Link)(() => ({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: 10,
	backgroundColor: "rgba(255,255,255,0.6)",
	padding: 8,
	width: 40,
	height: 40,
}));

export const SocialImage = styled("img")(() => ({
	width: 32,
	height: 32,
}));

export const NavLinks = styled("nav")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	gap: theme.spacing(3),
}));

export const NavItem = styled(NavLink)(() => ({
	color: "inherit",
	textDecoration: "none",
	"&.active": {
		textDecoration: "underline",
		fontWeight: 600,
	},
}));
