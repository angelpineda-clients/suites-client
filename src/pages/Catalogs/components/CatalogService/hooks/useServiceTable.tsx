import { useState, useEffect } from "react";
/* libraries */
import Swal from "sweetalert2";
import { Button, Stack, TextField } from "@mui/material";

/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { services } from "@/services/services.service";

const useServiceTable = () => {
	const { showFormModal, formHook } = useFormModal();
	const [rows, setRows] = useState([]);
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
			showFormModal({
				title: "modal",
				children: (
					<Stack gap={2}>
						<TextField
							label="Servicio"
							id="name"
							value={formFields.name?.value}
							defaultValue={data?.name || ""}
							required
							{...formFields.name}
						/>
						<Button variant="outlined" type="submit">
							Crear
						</Button>
					</Stack>
				),
				request: request,
			}).then((response) => {
				if (response.status == true) {
					Swal.fire({
						title: "Todo bien!",
						icon: "success",
						timer: 2500,
						timerProgressBar: true,
						target: "header",
					});
					setRows(response.data);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteService(data: any) {
		try {
			Swal.fire({
				showConfirmButton: true,
				confirmButtonColor: "#ff5733",
				confirmButtonText: "Eliminar",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				cancelButtonColor: "#1f1f1f",
				icon: "warning",
				title: "¿Eliminar?",
				text: `¿Deseas eleminar ${data.name}? `,
				target: "header",
			}).then(async (response) => {
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
