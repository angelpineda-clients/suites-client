import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { serviceService } from "@/services/services.service";
import { customAlert } from "@/helpers/alertHelper";
import { IService } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";
import usePagination from "@/hooks/usePagination";

const useServiceTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
		},
	});
	const [rows, setRows] = useState<IService[]>([]);
	const { pagination, setPagination, onPagination } = usePagination();
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
	}, [pagination.page, pagination.pageSize]);

	/**
	 * fetchData
	 * fetch services
	 */
	async function fetchData() {
		const data = await serviceService.getAll({
			page: pagination.page,
			pageSize: pagination.pageSize,
		});

		if (data) {
			setRows(data?.items);
			setPagination(data?.pagination);
		}
	}

	/**
	 * handleForm
	 * allow to handle form submit for methods post and put
	 */
	async function handleForm(data?: IService) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (service: IService) =>
					serviceService.update({
						id: data.id,
						service,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		} else {
			request = {
				endpoint: (service: IService) =>
					serviceService.create({
						service,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		}

		try {
			showFormModal<PaginatedData<IService>>({
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
				if (response) {
					customAlert.success();
					setRows(response.items);
					setPagination(response.pagination);
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteService(service: IService) {
		try {
			customAlert.warning({ name: service.name }).then(async (response) => {
				if (response.isConfirmed) {
					try {
						const data = await serviceService.remove({
							id: service.id,
							page: pagination.page,
							pageSize: pagination.pageSize,
						});

						if (data) {
							setRows(data.items);
							setPagination(data.pagination);
							customAlert.success();
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
		onPagination,
		rows,
		pagination,
	};
};

export default useServiceTable;
