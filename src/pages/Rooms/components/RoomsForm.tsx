import { IRoom } from "@/interfaces/models/IRoom";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SelectFloor from "./SelectFloor";
import SelectSize from "./SelectSize";
import CheckServices from "./CheckServices";

import UploadImages from "./UploadImages";

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
			onChange: (e) => {
				const value = e.target.value.toUpperCase();
				formHook.setValue("name", value);
			},
		}),
		price: formHook.register("price", {
			required: {
				value: true,
				message: "Campo requerido",
			},
			valueAsNumber: true,
		}),
		capacity: formHook.register("capacity", {
			valueAsNumber: true,
		}),
		beds: formHook.register("beds", {
			valueAsNumber: true,
		}),
		floor: formHook.register("floor_id", {}),
		size: formHook.register("size_id", {}),
		services: formHook.register("services", {}),
		images: formHook.register("images", {}),
		description: formHook.register("description", {}),
	};
	return (
		<Grid container spacing={2}>
			<Grid size={6}>
				<TextField
					id="name"
					label="Nombre"
					defaultValue={data?.name || ""}
					required
					fullWidth
					{...formFields.name}
				/>
			</Grid>
			<Grid size={6}>
				<TextField
					id="price"
					label="Precio"
					type="number"
					defaultValue={data?.price || ""}
					required
					fullWidth
					{...formFields.price}
				/>
			</Grid>
			<Grid size={6}>
				<TextField
					id="capacity"
					label="Capacidad"
					type="number"
					defaultValue={data?.capacity || ""}
					required
					fullWidth
					{...formFields.capacity}
				/>
			</Grid>

			<Grid size={6}>
				<TextField
					id="beds"
					label="Camas"
					type="number"
					defaultValue={data?.beds || ""}
					required
					fullWidth
					{...formFields.beds}
				/>
			</Grid>

			<Grid size={6}>
				<SelectFloor formField={formFields.floor} />
			</Grid>

			<Grid size={6}>
				<SelectSize formField={formFields.size} />
			</Grid>

			<Grid size={12}>
				<CheckServices formHook={formHook} />
			</Grid>

			<Grid size={12}>
				<TextField
					id="description"
					label="Descripcion"
					type="textarea"
					fullWidth
					{...formFields.description}
				/>
			</Grid>

			<Grid size={12}>
				<UploadImages formHook={formHook} />
			</Grid>

			<Grid display="flex" justifyContent="center" width="100%">
				<Button type="submit" variant="outlined" data-testid="login-submit">
					Enviar
				</Button>
			</Grid>
		</Grid>
	);
};

export default RoomsForm;
