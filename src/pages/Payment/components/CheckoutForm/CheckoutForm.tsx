import { useState } from "react";

import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

const options = {
	layout: "accordion",
};

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<string | undefined>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
			},
			redirect: "if_required",
		});

		if (result.error) {
			// Show error to your customer (for example, payment details incomplete)
			//console.log(result.error.message);
			setError(result.error.message);
		} else if (result.paymentIntent?.status == "succeeded") {
			handleLocalStorage.clear();

			return document.location.replace(`http://localhost:3000/sucess-order`);
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
