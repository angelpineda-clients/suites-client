import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { customAlert } from "@/helpers/alertHelper";
import { ISeason } from "@/interfaces/models";
import { seasonService } from "@/services/season.service";
import usePagination from "./usePagination";
import { PaginatedData } from "@/interfaces/IPagination";

const useSeasonTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const [rows, setRows] = useState<ISeason[]>([]);
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
		const data = await seasonService.getAll({
			page: pagination.page,
			pageSize: pagination.pageSize,
		});
		if (data) {
			setRows(data.items);
			setPagination(data.pagination);
		}
	}

	async function handleForm(data?: ISeason) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (season: ISeason) =>
					seasonService.update({
						id: data.id,
						season,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		} else {
			request = {
				endpoint: (season: ISeason) =>
					seasonService.create({
						season,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		}

		try {
			showFormModal<PaginatedData<ISeason>>({
				title: data?.id ? "Editar temporada." : "Crear temporada.",
				children: (
					<Stack gap={2}>
						<TextField
							id="name"
							label="Temporada"
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
			}).then((data) => {
				if (data) {
					setRows(data.items);
					setPagination(data.pagination);
					customAlert.success();
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function remove(season: any) {
		try {
			customAlert.warning({ name: season.name }).then(async (response) => {
				if (response.isConfirmed) {
					const data = await seasonService.remove({
						id: season.id,
						page: pagination.page,
						pageSize: pagination.pageSize,
					});

					if (data) {
						setRows(data.items);
						setPagination(data.pagination);
						customAlert.success();
					}
				}
			});
		} catch (error) {}
	}

	return {
		fetchData,
		handleForm,
		remove,
		rows,
		pagination,
		onPagination,
	};
};

export default useSeasonTable;
