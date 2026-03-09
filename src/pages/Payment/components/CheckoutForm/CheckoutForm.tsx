import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import { handleLocalStorage } from "@/helpers/handleLocalStorage";
import { useBookingStore } from "@/store/booking";
import { Alert, Stack } from "@mui/material";
import { AppButton } from "@/components/AppButton/AppButton";

const options: StripePaymentElementOptions = {
  layout: "accordion",
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const customer = useBookingStore((state) => state.customer);

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
        return_url: "http://localhost:3000/success-order",
        payment_method_data: {
          billing_details: {
            name: `${customer.name} ${customer.lastName}`,
            email: customer.email,
            phone: customer.phoneNumber,
          },
        },
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      //console.log(result.error.message);
      setError(result.error.message ?? "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      handleLocalStorage.clear();

      return document.location.replace(`http://localhost:3000/success-order`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <PaymentElement options={options} />
        {error && <Alert severity="error">{error}</Alert>}
        <AppButton type="submit" appVariant="primary" disabled={!stripe} block>
          Pagar
        </AppButton>
      </Stack>
    </form>
  );
};

export default CheckoutForm;
