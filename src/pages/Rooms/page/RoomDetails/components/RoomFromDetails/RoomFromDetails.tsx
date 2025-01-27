import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Button, Grid2 as Grid } from "@mui/material";

import { IRoomResponse, Service } from "@/interfaces/IRoomResponse";

import InputCurrencyForm from "@/components/Inputs/InputCurrency/InputCurrencyForm";
import SelectSize from "@/pages/Rooms/components/SelectSize";
import InputForm from "@/components/Inputs/InputForm/InputForm";
import SelectFloor from "@/pages/Rooms/components/SelectFloor";
import CheckServices from "@/pages/Rooms/components/CheckServices";

interface IFormFields {
	name: string;
	price: number;
	description: string;
	capacity: number;
	beds: number;
	floor_id: number;
	size_id: number;
	services: Service[];
}

interface Props {
	data: IRoomResponse;
	onSubmit: (data: any) => void;
}

const RoomFormDetails = ({ data, onSubmit }: Props) => {
	const [disableSubmit, setDisableSubmit] = useState(true);

	const formHook = useForm<IFormFields>({
		values: {
			name: data.name,
			price: data.price,
			description: data.description,
			capacity: data.capacity,
			beds: data.beds,
			floor_id: data.floor_id,
			size_id: data.size_id,
			services: data.services,
		},
	});
	useEffect(() => {
		const currentValues = JSON.stringify(formHook.watch());
		const formValues = JSON.stringify(formHook.formState.defaultValues);

		if (currentValues != formValues && data?.id) {
			setDisableSubmit(false);
		} else {
			setDisableSubmit(true);
		}
	}, [formHook.watch()]);

	const formFields = {
		name: formHook.register("name", {
			required: {
				value: true,
				message: "Campo requerido",
			},
		}),
		price: formHook.register("price", {
			required: {
				value: true,
				message: "Campo requerido",
			},
		}),
		capacity: formHook.register("capacity", {
			valueAsNumber: true,
			value: 0,
		}),
		beds: formHook.register("beds", {
			valueAsNumber: true,
			value: 0,
		}),
		floor: formHook.register("floor_id"),
		size: formHook.register("size_id"),
		services: formHook.register("services"),
		description: formHook.register("description"),
	};

	return (
		<form
			style={{
				marginTop: "40px",
				border: "thin solid gray",
				borderRadius: "8px",
				padding: "24px 12px",
			}}
			onSubmit={formHook.handleSubmit(onSubmit)}
		>
			<Grid container spacing={2}>
				<InputForm
					id="name"
					label="Nombre"
					required
					defaultValue={data?.name}
					formHook={formHook}
				/>
				<Grid size={6} display="flex" justifyContent="end">
					<Button
						type="submit"
						variant="contained"
						data-testid="login-submit"
						disabled={disableSubmit}
					>
						Actualizar
					</Button>
				</Grid>
				<InputForm
					id="description"
					label="Descripcion"
					defaultValue={data?.description}
					formHook={formHook}
					size={12}
				/>
				<InputCurrencyForm
					id="price"
					label="Precio"
					defaultValue={data?.price}
					required
					formHook={formHook}
					size={2}
				/>

				<InputForm
					id="capacity"
					label="Capacidad"
					type="number"
					defaultValue={data?.capacity}
					formHook={formHook}
					size={2}
				/>

				<InputForm
					id="beds"
					label="Camas"
					type="number"
					defaultValue={data?.beds}
					formHook={formHook}
					size={2}
				/>

				<Grid size={3}>
					<SelectFloor defaultValue={data?.floor_id} form={formHook} />
				</Grid>

				<Grid size={3}>
					<SelectSize form={formHook} defaultValue={data?.size_id} />
				</Grid>

				<Grid size={12}>
					<CheckServices formHook={formHook} defaultValue={data?.services} />
				</Grid>
			</Grid>
		</form>
	);
};

export default RoomFormDetails;
