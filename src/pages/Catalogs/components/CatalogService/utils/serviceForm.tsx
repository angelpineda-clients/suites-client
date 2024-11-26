/* Libraries */
import { Button, Stack, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { IRequest } from "@/hooks/useFormModal";

import { IService } from "@/interfaces/models";

import { serviceService } from "@/services/services.service";

interface ServiceForm {
	data?: IService;
	formHook: UseFormReturn<FieldValues, any, undefined>;
	page?: number;
	pageSize?: number;
}

/**
 * serviceForm
 * return object for useForm hook
 *
 * @param {ServiceForm} {
 * 	data,
 * 	formHook,
 * 	page = 0,
 * 	pageSize = 10,
 * }
 * @return {object}
 */
export function serviceForm({
	data,
	formHook,
	page = 0,
	pageSize = 10,
}: ServiceForm) {
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
	};
	let request: IRequest;

	if (data?.id) {
		request = {
			endpoint: (service: IService) =>
				serviceService.update({
					id: data.id,
					service,
					page: page,
					pageSize: pageSize,
				}),
		};
	} else {
		request = {
			endpoint: (service: IService) =>
				serviceService.create({
					service,
					page: page,
					pageSize: pageSize,
				}),
		};
	}

	return {
		title: data?.id ? "Editar servicio." : "Crear servicio.",
		children: (
			<Stack
				gap={2}
				width={350}
				sx={{
					margin: "0 auto",
				}}
			>
				<TextField
					id="name"
					label="Servicio"
					defaultValue={data?.name || ""}
					fullWidth
					required
					{...formFields.name}
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
