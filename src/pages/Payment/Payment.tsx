import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Typography } from "@mui/material";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import CheckoutForm from "./components/CheckoutForm/CheckoutForm";

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
