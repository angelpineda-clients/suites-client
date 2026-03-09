import { handleLocalStorage } from "@/helpers/handleLocalStorage";
import { useEffect } from "react";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import { AppButton } from "@/components/AppButton/AppButton";

const SuccessOrder = () => {
  useEffect(() => {
    handleLocalStorage.removeItem("booking");
    handleLocalStorage.removeItem("clientSecret");
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h4">Reserva confirmada</Typography>
        <Typography variant="body1" color="text.secondary">
          Redireccionar si no existe un Payment intent valido
        </Typography>
        <List dense sx={{ pl: 2 }}>
          <ListItem disableGutters>Mostrar mensaje bonito</ListItem>
          <ListItem disableGutters>Mostrar correo al que se envio la reserva</ListItem>
          <ListItem disableGutters>Boton para descargar en PDF la reserva hecha.</ListItem>
          <ListItem disableGutters>Boton (Ir al inicio)</ListItem>
        </List>
        <AppButton appVariant="primary" onClick={() => (window.location.href = "/")}>
          Ir al inicio
        </AppButton>
      </Stack>
    </Box>
  );
};

export default SuccessOrder;
