import { Container, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { AppButton } from "@/components/AppButton/AppButton";

export const HeaderRoot = styled("header")(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(38, 184, 188, 1) 0%, rgba(140, 214, 211, 0.7) 45%, rgba(255, 247, 237, 0.4) 100%)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(1),
}));

export const HeaderContainer = styled(Container)(() => ({
  width: "100%",
}));

export const HeaderTitle = styled(Typography)(() => ({
  color: "white",
  fontFamily: "Island",
  textShadow: "rgba(0, 0, 0, 0.6) 1px 1px 4px",
}));

export const HeaderInfo = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
  gap: theme.spacing(2),
}));

export const ContactStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "20%",
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

export const ContactNumbers = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.25),
}));

export const ContactLink = styled(Link)(() => ({
  textDecoration: "underline",
  color: "inherit",
}));

export const FbLink = styled(Link)(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  backgroundColor: "rgba(255,255,255,0.6)",
  padding: 8,
}));

export const FbImage = styled("img")(() => ({
  width: 32,
  height: 32,
}));

export const NavContainer = styled("nav")(() => ({
  width: "100%",
}));

export const NavList = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  listStyle: "none",
  width: "50vw",
  maxWidth: 300,
  padding: 0,
  margin: 0,
  gap: theme.spacing(2),
}));

export const NavItem = styled(NavLink)(() => ({
  color: "black",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  "&.active": {
    textDecoration: "underline",
    fontWeight: 600,
  },
}));

export const ActionsStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "20%",
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

export const ActionButton = styled(AppButton)(() => ({
  fontSize: 12,
  padding: 6,
}));
