import { Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { alpha, styled } from "@mui/material/styles";
import { AppButton } from "@/components/AppButton/AppButton";

export const RoomCardContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1.5, 0),
  width: "100%",
  minHeight: 500,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const RoomCardBody = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1100,
  margin: `${theme.spacing(1.5)} auto`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const CardInfo = styled(Stack)(({ theme }) => ({
  width: "45%",
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const GalleryStack = styled(Stack)(({ theme }) => ({
  width: "45%",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const MetaGrid = styled(Grid)(() => ({
  marginTop: 0,
}));

export const MetaItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

export const MetaLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  width: "100%",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const MetaInfo = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

export const BookButton = styled(AppButton)(() => ({
  alignSelf: "center",
  fontWeight: 700,
}));

export const ServicesWrap = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(0.75),
  justifyContent: "center",
}));

export const ServicePill = styled(Stack)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontSize: 12,
  fontWeight: 600,
}));
