import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const options = {
	layout: "accordion",
};

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<string | undefined>("");

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/sucess-order",
				payment_method_data: {
					billing_details: {
						name: "Client name",
						email: "email@domain.com",
					},
				},
			},
		});

		if (result.error) {
			// Show error to your customer (for example, payment details incomplete)
			//console.log(result.error.message);
			setError(result.error.message);
		} else {
			console.log(result);
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement options={options} />
			<button type="submit" disabled={!stripe}>
				Submit
			</button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default CheckoutForm;
