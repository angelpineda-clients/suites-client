import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Typography } from "@mui/material";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import CheckoutForm from "./components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
	const [options, setOptions] = useState({
		clientSecret: "",
	});

	useEffect(() => {
		const isClientSecret = handleLocalStorage.getItem("clientSecret");

		if (isClientSecret) {
			setOptions({
				clientSecret: JSON.parse(isClientSecret),
			});
		}
	}, []);
	return (
		<Container>
			<Typography variant="h1"> Checkout </Typography>
			{options.clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm />
				</Elements>
			)}
		</Container>
	);
};

export default Payment;
