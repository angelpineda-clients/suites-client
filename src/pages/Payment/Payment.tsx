import { Container, Typography } from "@mui/material";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
	const [options, setOptions] = useState({
		clientSecret: "",
	});

	useEffect(() => {
		const isClientSecret = localStorage.getItem("clientSecret");

		if (isClientSecret) {
			setOptions({
				clientSecret: isClientSecret,
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
