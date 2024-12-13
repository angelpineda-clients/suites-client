import { useEffect, useState } from "react";

import { format } from "date-fns";
import { DateRangePicker } from "rsuite";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "../styles/home-form.css";

type DateRange = [Date, Date] | null;

function generateDateRange(): DateRange {
	const initialDate = new Date();
	const finalDate = new Date();

	return [initialDate, finalDate];
}

const HomeForm = () => {
	const { handleSubmit, register, setValue } = useForm();
	const [dateRange, setDateRange] = useState(generateDateRange());
	const [adults, setAdults] = useState(2);
	const [children, setChildren] = useState(0);

	useEffect(() => {
		setValue("adults", adults);
	}, [adults]);

	useEffect(() => {
		setValue("children", children);
	}, [children]);

	const formFields = {
		checkIn: register("check_in", {
			required: true,
		}),
		checkOut: register("check_out", {
			required: true,
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
	function handleAdultClick(value: string) {
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
	function handleChildrenClick(value: string) {
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

	function onSubmit(values) {
		console.log(values);
	}

	return (
		<Box
			sx={{
				marginTop: 6,
			}}
		>
			<form id="home-form" onSubmit={handleSubmit(onSubmit)}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<label
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-around",
						}}
					>
						<span>Check-in</span> <span>Check-out</span>
					</label>
					<DateRangePicker
						format="yyyy/MM/dd"
						character=" - "
						size="lg"
						onChange={(e: DateRange) => {
							const [initial, final] = e;

							setValue("check_in", format(initial, "yyyy-MM-dd"));
							setValue("check_out", format(final, "yyyy-MM-dd"));
							setDateRange([initial, final]);
						}}
						style={{
							width: "250px",
						}}
						value={dateRange}
					/>
				</div>

				<div className="control-input">
					<button
						onClick={() => handleAdultClick("DECRESE")}
						className={`button-circle ${adults == 1 ? "disabled" : ""}`}
						disabled={adults == 1 ? true : false}
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
						onClick={() => handleAdultClick("INCRESE")}
						className="button-circle"
					>
						<AddIcon />
					</button>
				</div>

				<div className="control-input">
					<button
						onClick={() => handleChildrenClick("DECRESE")}
						className={`button-circle ${children == 0 ? "disabled" : ""}`}
						disabled={children == 0 ? true : false}
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
						onClick={() => handleChildrenClick("INCRESE")}
						className="button-circle"
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

export default HomeForm;
