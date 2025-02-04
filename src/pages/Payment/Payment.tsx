import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import { Box, Container, Typography } from "@mui/material";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import { Stack } from "rsuite";

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
	const [options, setOptions] = useState({
		clientSecret: "",
		fields: {
			billingDetails: "auto",
		},
	});

	useEffect(() => {
		const isClientSecret = handleLocalStorage.getItem("clientSecret");

		if (isClientSecret) {
			setOptions({ ...options, clientSecret: isClientSecret });
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
				{options.clientSecret && (
					<Elements stripe={stripePromise} options={options}>
						<CheckoutForm />
					</Elements>
				)}
			</Stack>
		</Container>
	);
};

export default Payment;
