import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import REGEX_VALIDATIONS from "@/constants/regex";

import InputForm from "@/components/Inputs/InputForm/InputForm";
import { useBookingStore } from "@/store/booking";

const FormConfirmBooking = () => {
	const formHook = useForm();
	const [params] = useSearchParams();
	const booking = useBookingStore((state) => state.booking);

	useEffect(() => {
		getParams();
	}, [params]);

	useEffect(() => {
		if (booking) {
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
		roomID: formHook.register("name", {
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

	function submit(data) {
		console.log(data);
	}

	return (
		<form onSubmit={formHook.handleSubmit(submit)}>
			<Stack gap={1}>
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
				<Button type="submit"> Pagar </Button>
			</Stack>
		</form>
	);
};

export default FormConfirmBooking;
