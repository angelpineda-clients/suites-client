import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import SelectFloor from "./SelectFloor";
import SelectSize from "./SelectSize";
import CheckServices from "./CheckServices";
import UploadImages from "./UploadImages";
import InputForm from "@/components/Inputs/InputForm/InputForm";
import InputCurrencyForm from "@/components/Inputs/InputCurrency/InputCurrencyForm";

import { IRoom } from "@/interfaces/models/IRoom";

interface Props {
	data?: IRoom;
	formHook: UseFormReturn<FieldValues, any, undefined>;
}

const RoomsForm = ({ data, formHook }: Props) => {
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
		floor: formHook.register("floor_id", {}),
		size: formHook.register("size_id", {}),
		services: formHook.register("services", {}),
		images: formHook.register("images", {}),
		description: formHook.register("description", {}),
	};

	return (
		<Grid container spacing={2}>
			<InputForm
				id="name"
				label="Nombre"
				required
				defaultValue={data?.name}
				formHook={formHook}
			/>
			<InputCurrencyForm
				id="price"
				label="Precio"
				required
				formHook={formHook}
			/>

			<InputForm
				id="capacity"
				label="Capacidad"
				type="number"
				defaultValue={data?.capacity || ""}
				formHook={formHook}
			/>

			<InputForm
				id="beds"
				label="Camas"
				type="number"
				defaultValue={data?.beds || ""}
				formHook={formHook}
			/>

			<Grid size={6}>
				<SelectFloor form={formHook} />
			</Grid>

			<Grid size={6}>
				<SelectSize form={formHook} />
			</Grid>

			<Grid size={12}>
				<CheckServices formHook={formHook} />
			</Grid>

			<InputForm
				id="description"
				label="Descripcion"
				formHook={formHook}
				size={12}
			/>

			<Grid size={12}>
				<UploadImages formHook={formHook} />
			</Grid>

			<Grid display="flex" justifyContent="center" width="100%">
				<Button type="submit" variant="outlined" data-testid="login-submit">
					Guardar
				</Button>
			</Grid>
		</Grid>
	);
};

export default RoomsForm;
