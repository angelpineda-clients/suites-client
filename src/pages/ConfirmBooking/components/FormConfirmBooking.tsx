import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useBookingStore } from "@/store/booking";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import REGEX_VALIDATIONS from "@/constants/regex";

import InputForm from "@/components/Inputs/InputForm/InputForm";
import { bookingService } from "@/services/booking.service";

const FormConfirmBooking = () => {
	const formHook = useForm();
	const [params] = useSearchParams();
	const booking = useBookingStore((state) => state.booking);
	const setCustomer = useBookingStore((state) => state.setCustomer);
	const navigate = useNavigate();

	useEffect(() => {
		getParams();
	}, [params]);

	useEffect(() => {
		if (booking.checkIn || booking.checkOut) {
			formHook.setValue("check_in", booking.checkIn);
			formHook.setValue("check_out", booking.checkOut);
		}
	}, [booking]);

	const formFields = {
		name: formHook.register("name", {
			required: {
				value: true,
				message: "Field required",
			},
			pattern: {
				value: REGEX_VALIDATIONS.LETTERS,
				message: "Only accept letters",
			},
		}),
		lastName: formHook.register("last_name", {
			required: {
				value: true,
				message: "Field required",
			},
			pattern: {
				value: REGEX_VALIDATIONS.LETTERS,
				message: "Only accept letters",
			},
		}),
		phoneNumber: formHook.register("phone_number", {
			required: {
				value: true,
				message: "Field required",
			},
			pattern: {
				value: REGEX_VALIDATIONS.PHONE_NUMBER,
				message: "Phone should be 10 digits",
			},
		}),
		email: formHook.register("email", {
			required: {
				value: true,
				message: "Field required",
			},
			pattern: {
				value: REGEX_VALIDATIONS.EMAIL,
				message: "Not valid email.",
			},
		}),
		checkIn: formHook.register("check_in", {
			required: {
				value: true,
				message: "Field required",
			},
		}),
		checkOut: formHook.register("check_out", {
			required: {
				value: true,
				message: "Field required",
			},
		}),
		roomID: formHook.register("room_id", {
			required: {
				value: true,
				message: "Field required",
			},
		}),
	};

	/**
	 * getParams
	 * get room id and set its value in form.
	 */
	function getParams() {
		const roomID = params.get("room_id");

		if (roomID) {
			formHook.setValue("room_id", roomID);
		}
	}

	async function submit(data: any) {
		const response = await bookingService.store(data);

		if (response) {
			setCustomer({
				name: data.name,
				lastName: data.last_name,
				phoneNumber: data.phone_number,
				email: data.email,
			});
			handleLocalStorage.setItem("clientSecret", response);

			return navigate(`/payment`);
		}
	}

	return (
		<form onSubmit={formHook.handleSubmit(submit)}>
			<Stack gap={2}>
				<InputForm id="name" label="Nombre" formHook={formHook} required />
				<InputForm
					id="last_name"
					label="Apellido"
					formHook={formHook}
					required
				/>
				<InputForm
					id="phone_number"
					label="Teléfono"
					formHook={formHook}
					required
				/>
				<InputForm
					id="email"
					label="Correo"
					formHook={formHook}
					required
					type="email"
				/>
				<Button type="submit" variant="contained">
					{" "}
					Pagar{" "}
				</Button>
			</Stack>
		</form>
	);
};

export default FormConfirmBooking;
