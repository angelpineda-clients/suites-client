import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Box, Container, Typography } from "@mui/material";
import { handleLocalStorage } from "@/helpers/handleLocalStorage";
import { Stack } from "rsuite";

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [options, setOptions] = useState({
    clientSecret: "",
  });

  useEffect(() => {
    const isClientSecret = handleLocalStorage.getItem("clientSecret");

    if (isClientSecret) {
      setOptions({ clientSecret: isClientSecret });
    }
  }, []);

  return (
    <Container
      sx={{
        paddingY: 4,
      }}
    >
      <Typography variant="h1" component="h2" textAlign="center">
        Checkout
      </Typography>

      <Stack justifyContent="space-between">
        <Box>
          <Typography variant="h3" component="h3">
            Nombre cuarto
          </Typography>
        </Box>
        {options && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </Stack>
    </Container>
  );
};

export default Payment;
