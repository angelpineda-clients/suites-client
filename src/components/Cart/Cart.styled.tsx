import { Stack, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { AppButton } from "@/components/AppButton/AppButton";

export const CartRoot = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2.5),
  width: 500,
  textAlign: "center",
  gap: theme.spacing(4),
}));

export const CloseRow = styled(Stack)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export const TotalText = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const CalendarDay = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const DayNumber = styled(Typography)<TypographyProps>(() => ({
  minHeight: 15,
  lineHeight: 1,
}));

export const DayPrice = styled(Typography)<TypographyProps>(() => ({
  fontSize: 10,
}));

export const ConfirmButton = styled(AppButton)(() => ({}));

export const LabelText = styled(Typography)<TypographyProps>(() => ({
  fontWeight: 700,
}));
