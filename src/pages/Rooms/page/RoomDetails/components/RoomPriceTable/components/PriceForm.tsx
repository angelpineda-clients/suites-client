import InputCurrencyForm from "@/components/Inputs/InputCurrency/InputCurrencyForm";
import { seasonService } from "@/services/season.service";
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props {
	data?: object;
	roomID: string;
	rows: any[];
	formHook: UseFormReturn<FieldValues, any, undefined>;
}

const PriceForm = ({ data, roomID, rows, formHook }: Props) => {
	const [items, setItems] = useState<any[]>([]);
	const formFields = {
		roomID: formHook.register("room_id", {
			required: {
				value: data.id ? false : true,
				message: "Room id required",
			},
		}),
		seasonID: formHook.register("season_id", {
			required: {
				value: data.id ? false : true,
				message: "Season id required",
			},
		}),
		amount: formHook.register("amount", {
			required: {
				value: true,
				message: "Amount is required",
			},
		}),
	};

	useEffect(() => {
		getSeasons();
	}, [rows, data]);

	useEffect(() => {
		formHook.setValue("room_id", roomID);
	}, [roomID]);

	async function getSeasons() {
		if (data?.id) return;

		const response = await seasonService.getAll({ page: 0, pageSize: 50 });

		// create unique array of seasons asigned to prices
		const areSeasons = rows.reduce((acc, current) => {
			if (!acc.includes(current.seasonID)) {
				acc.push(current.seasonID);
			}

			return acc;
		}, []);

		// create array of {value, label} for select
		const selectItems = response?.items.reduce((acc, current) => {
			if (!areSeasons.includes(current.id)) {
				acc.push({ value: current.id, label: current.name });
			}
			return acc;
		}, []);

		setItems(selectItems);
	}

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			{!data?.id && (
				<FormControl fullWidth sx={{ mb: 4 }}>
					<InputLabel id="season">Temporadas</InputLabel>
					<Select
						label="Temporada"
						defaultValue={undefined}
						{...formFields.seasonID}
					>
						{items.map((item) => {
							return (
								<MenuItem
									key={`select-season-${item?.label}-${item?.value}`}
									value={item?.value}
								>
									{item?.label}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			)}

			<InputCurrencyForm
				id="amount"
				label="Monto"
				defaultValue={data?.amount}
				formHook={formHook}
			/>

			<Button
				type="submit"
				variant="contained"
				sx={{ mt: 4, maxWidth: "50%", mx: "auto" }}
			>
				Guardar
			</Button>
		</Container>
	);
};

export default PriceForm;
