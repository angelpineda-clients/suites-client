import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UploadWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const UploadLabel = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 0, 0.5),
  fontWeight: 600,
}));

export const DropZone = styled(Box)(({ theme }) => ({
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
}));
