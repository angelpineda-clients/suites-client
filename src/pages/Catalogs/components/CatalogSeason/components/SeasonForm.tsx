import { useEffect, useState } from "react";

import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button, FormLabel, Stack, TextField } from "@mui/material";

import { ISeason } from "@/interfaces/models";

import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "@/components/FormCalendar/helper/calendar_dates";
import { seasonService } from "@/services/season.service";

interface Props {
	formHook: UseFormReturn<FieldValues, any, undefined>;
	data?: ISeason;
}

const DATE_FORMAT = "yyyy-MM-dd";
const CURRENT_YEAR = new Date().getFullYear();

const MIN_DATE = new Date(CURRENT_YEAR, 0, 1);

const SeasonForm = ({ formHook, data }: Props) => {
	const [dateRange, setDateRange] = useState<DateRange[]>([
		undefined,
		undefined,
	]);
	const [disabledDates, setDisabledDates] = useState([]);

	useEffect(() => {
		getTakenDates();
	}, []);

	async function getTakenDates() {
		const dates = await seasonService.takenDates(data?.id);
		setDisabledDates(dates);
	}

	const formFields = {
		name: formHook.register("name", {
			required: {
				value: true,
				message: "Campo requerido",
			},
			onChange: (e) => {
				const value = e.target.value.toUpperCase();
				formHook.setValue("name", value);
			},
		}),
		alias: formHook.register("alias", {
			onChange: (e) => {
				const value = e.target.value.toUpperCase();
				formHook.setValue("alias", value);
			},
		}),
		initialDate: formHook.register("initial_date", {
			required: {
				value: false,
				message: "Campo requerido",
			},
			value: data?.initialDate,
		}),
		finalDate: formHook.register("final_date", {
			required: {
				value: false,
				message: "Campo requerido",
			},
		}),
	};

	function onHandleCalendarChange(values: DateRange[]) {
		const start: string | null = values[0]
			? format(values[0], DATE_FORMAT)
			: null;
		const end: string | null = values[1]
			? format(values[1], DATE_FORMAT)
			: null;

		setDateRange(values);

		formHook.setValue("initial_date", format(start, "yyyy-MM-dd"));
		formHook.setValue("final_date", format(end, "yyyy-MM-dd"));
	}

	return (
		<Stack gap={2}>
			{/* <div style={{ display: "flex", flexDirection: "column" }}>
				<FormLabel
					sx={{
						typography: "subtitle1",
						padding: "0 4px",
					}}
				>
					Fecha
				</FormLabel>
				<DateRangePicker
					format="MM/dd"
					character=" - "
					size="lg"
					onChange={(e: DateRange) => {
						const [initial, final] = e;

						formHook.setValue("initial_date", format(initial, "yyyy-MM-dd"));
						formHook.setValue("final_date", format(final, "yyyy-MM-dd"));
						setDateRange([initial, final]);
					}}
					value={dateRange}
				/>
			</div> */}

			<div
				style={{
					zIndex: 9999,
				}}
			>
				<DatePicker
					startDate={dateRange[0] || undefined}
					endDate={dateRange[1] || undefined}
					onChange={onHandleCalendarChange}
					dateFormat={DATE_FORMAT}
					excludeDates={disabledDates}
					monthsShown={2}
					minDate={MIN_DATE}
					selectsRange
					isClearable
				/>
			</div>

			<TextField
				id="name"
				label="Temporada"
				defaultValue={data?.name || ""}
				required
				{...formFields.name}
			/>
			<TextField
				id="alias"
				label="Alias"
				defaultValue={data?.alias || ""}
				{...formFields.alias}
			/>

			<Button
				variant="contained"
				type="submit"
				sx={{
					maxWidth: "50%",
					margin: "0 auto",
					alignSelf: "end",
				}}
			>
				Guardar
			</Button>
		</Stack>
	);
};

export default SeasonForm;
