import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { services } from "@/services/services.service";
import { customAlert } from "@/helpers/alertHelper";
import { IService } from "@/interfaces/models";

const useServiceTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
		},
	});
	const [rows, setRows] = useState<IService>([]);
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

	useEffect(() => {
		fetchData();
	}, []);

	/**
	 * fetchData
	 * fetch services
	 */
	async function fetchData() {
		const response = await services.getAll();
		setRows(response);
		return response;
	}

	async function handleForm({ data }: any) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (newData: any) => services.update(data.id, newData),
			};
		} else {
			request = { endpoint: (newData: any) => services.create(newData) };
		}

		try {
			showFormModal<IService>({
				title: data?.id ? "Editar servicio." : "Crear servicio.",
				children: (
					<Stack gap={2}>
						<TextField
							id="name"
							label="Servicio"
							defaultValue={data?.name || ""}
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
			}).then((response) => {
				if (response.status == true) {
					customAlert.success({});
					setRows(response.data);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteService(data: any) {
		try {
			customAlert.warning({ name: data.name }).then(async (response) => {
				if (response.isConfirmed) {
					try {
						const res = await services.remove(data.id);
						setRows(res.data);
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

export default useServiceTable;
