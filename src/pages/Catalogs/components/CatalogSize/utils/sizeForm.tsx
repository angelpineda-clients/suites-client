import { IRequest } from "@/hooks/useFormModal";
import { ISize } from "@/interfaces/models";
import { sizeService } from "@/services/size.service";
import { Button, Stack, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface SizeForm {
	data?: ISize;
	formHook: UseFormReturn<FieldValues, any, undefined>;
	page?: number;
	pageSize?: number;
}

export default function sizeForm({
	data,
	formHook,
	page = 0,
	pageSize = 10,
}: SizeForm) {
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
	};

	let request: IRequest;

	if (data?.id) {
		request = {
			endpoint: (size: ISize) =>
				sizeService.update({
					id: data.id,
					size,
					page,
					pageSize,
				}),
		};
	} else {
		request = {
			endpoint: (size: ISize) =>
				sizeService.create({
					size,
					page,
					pageSize,
				}),
		};
	}

	return {
		title: data?.id ? "Editar piso." : "Crear piso.",
		children: (
			<Stack gap={2}>
				<TextField
					id="name"
					label="Tamaño"
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
		),
		request: request,
	};
}
