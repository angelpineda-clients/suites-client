import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { customAlert } from "@/helpers/alertHelper";
import { IFloor } from "@/interfaces/models";
import { floorService } from "@/services/floor.service";

const useFloorTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const [rows, setRows] = useState<IFloor[]>([]);
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
		const data = await floorService.getAll();
		if (data) {
			setRows(data);
		}
	}

	async function handleForm(data?: IFloor) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (newData: IFloor) => floorService.update(data.id, newData),
			};
		} else {
			request = {
				endpoint: (newData: IFloor) => floorService.create(newData),
			};
		}

		try {
			showFormModal<IFloor[]>({
				title: data?.id ? "Editar piso." : "Crear piso.",
				children: (
					<Stack gap={2}>
						<TextField
							id="name"
							label="Piso"
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
						const data = await floorService.remove(season?.id);

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

export default useFloorTable;
