import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, TextField } from "@mui/material";

import { IStoreNewBooking, useBookingStore } from "@/store/booking";

import { IDateRange } from "@/components/FormCalendar/interfaces/IFormCalendar";
import FormCalendar from "@/components/FormCalendar/FormCalendar";

import "./styles/search-room-form.css";

interface ISearchRoomForm {
	onSubmit: (data: IStoreNewBooking) => void;
}

const SearchRoomForm = ({ onSubmit }: ISearchRoomForm) => {
	const formHook = useForm();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = formHook;
	const booking = useBookingStore((state) => state.booking);

	const [adults, setAdults] = useState<number>(2);
	const [children, setChildren] = useState<number>(0);

	useEffect(() => {
		setValue("adults", adults);
	}, [adults]);

	useEffect(() => {
		setValue("children", children);
	}, [children]);

	useEffect(() => {
		setAdults(Number(booking.adults));
		setChildren(Number(booking.children));
		handleDatesChange({ start: booking.checkIn, end: booking.checkOut });
	}, [booking]);

	const formFields = {
		checkIn: register("check_in", {
			required: true,
		}),
		checkOut: register("check_out", {
			required: {
				value: true,
				message: "Campo requerido",
			},
		}),
		adults: register("adults", {
			required: true,
		}),
		children: register("children"),
	};

	/**
	 * handleAdultChange
	 * sets value in adult state
	 * @param {(React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)} event
	 */
	function handleAdultChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const value = Number(event.target.value);

		setAdults(value);
	}

	/**
	 * handleAdultClick
	 * increse or decrese adults state
	 * @param {string} value
	 * @return {*}
	 */
	function handleAdultClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		value: string
	) {
		e.stopPropagation();

		switch (value) {
			case "INCRESE":
				setAdults((prev: number) => prev + 1);
				break;

			case "DECRESE":
				if (adults == 1) return;
				setAdults((prev: number) => prev - 1);
				break;

			default:
				break;
		}
	}

	/**
	 * handleChildrenClick
	 * increse or decrese children state
	 * @param {string} value
	 * @return {*}
	 */
	function handleChildrenClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		value: string
	) {
		e.stopPropagation();

		switch (value) {
			case "INCRESE":
				setChildren((prev: number) => prev + 1);
				break;

			case "DECRESE":
				if (children == 0) return;
				setChildren((prev: number) => prev - 1);
				break;

			default:
				break;
		}
	}

	function handleDatesChange({ start, end }: IDateRange) {
		formHook.setValue("check_in", start);
		formHook.setValue("check_out", end);
	}

	return (
		<Box
			sx={{
				marginTop: 6,
			}}
		>
			<form id="home-form" onSubmit={handleSubmit(onSubmit)}>
				<FormCalendar
					handleChange={handleDatesChange}
					dates={{ start: booking.checkIn, end: booking.checkOut }}
					error={errors["check_out"]?.message}
				/>

				<div className="control-input">
					<button
						onClick={(e) => handleAdultClick(e, "DECRESE")}
						className={`button-circle ${adults == 1 ? "disabled" : ""}`}
						disabled={adults == 1 ? true : false}
						type="button"
					>
						<RemoveIcon />
					</button>
					<TextField
						label="Adultos"
						type="number"
						value={adults}
						onChange={(e) => handleAdultChange(e)}
						sx={{ width: 80 }}
					/>
					<button
						onClick={(e) => handleAdultClick(e, "INCRESE")}
						className="button-circle"
						type="button"
					>
						<AddIcon />
					</button>
				</div>

				<div className="control-input">
					<button
						onClick={(e) => handleChildrenClick(e, "DECRESE")}
						className={`button-circle ${children == 0 ? "disabled" : ""}`}
						disabled={children == 0 ? true : false}
						type="button"
					>
						<RemoveIcon />
					</button>
					<TextField
						label="Ninos"
						type="number"
						value={children}
						sx={{ width: 80 }}
					/>
					<button
						onClick={(e) => handleChildrenClick(e, "INCRESE")}
						className="button-circle"
						type="button"
					>
						<AddIcon />
					</button>
				</div>
				<Button variant="contained" type="submit">
					Buscar
				</Button>
			</form>
		</Box>
	);
};

export default SearchRoomForm;
