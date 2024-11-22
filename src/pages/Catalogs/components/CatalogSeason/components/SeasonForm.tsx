import { format } from "date-fns";
import { DateRangePicker } from "rsuite";
import { Button, FormLabel, Stack, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { ISeason } from "@/interfaces/models";

import "rsuite/dist/rsuite.min.css";
import { useState } from "react";
import { formatDate } from "@/utils/Date";

interface Props {
	formHook: UseFormReturn<FieldValues, any, undefined>;
	data?: ISeason;
}

type DateRange = [Date, Date] | null;

function generateDateRange(data?: ISeason): DateRange {
	if (!data?.initialDate || !data?.finalDate) {
		return null;
	}

	const initialDate = formatDate(data.initialDate);
	const finalDate = formatDate(data.finalDate);

	return [initialDate, finalDate];
}

const SeasonForm = ({ formHook, data }: Props) => {
	const [dateRange, setDateRange] = useState<DateRange>(
		generateDateRange(data)
	);
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

	return (
		<Stack gap={2}>
			<div style={{ display: "flex", flexDirection: "column" }}>
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
