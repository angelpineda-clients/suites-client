import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { customAlert } from "@/helpers/alertHelper";
import { ISize } from "@/interfaces/models";
import { sizeService } from "@/services/size.service";

const useSizeTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const [rows, setRows] = useState<ISize[]>([]);
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

	useEffect(() => {
		fetchData();
	}, []);

	/**
	 * fetchData
	 * fetch services
	 */
	async function fetchData() {
		const response = await sizeService.getAll();
		setRows(response);
	}

	async function handleForm(data?: ISize) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (newData: ISize) => sizeService.update(data.id, newData),
			};
		} else {
			request = {
				endpoint: (newData: ISize) => sizeService.create(newData),
			};
		}

		try {
			showFormModal<ISize[]>({
				title: data?.id ? "Editar tamaño." : "Crear tamaño.",
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
			}).then((response) => {
				if (!!response) {
					customAlert.success({});
					setRows(response);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteService(season: any) {
		try {
			customAlert.warning({ name: season.name }).then(async (response) => {
				if (response.isConfirmed) {
					try {
						const data = await sizeService.remove(season?.id);

						if (data) {
							setRows(data);

							customAlert.success({});
						}
					} catch (error) {}
				}
			});
		} catch (error) {}
	}

	return {
		fetchData,
		handleForm,
		deleteService,
		rows,
	};
};

export default useSizeTable;
