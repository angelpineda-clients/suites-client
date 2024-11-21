import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import useFormModal, { IRequest } from "@/hooks/useFormModal";
import { customAlert } from "@/helpers/alertHelper";
import { ISize } from "@/interfaces/models";
import { sizeService } from "@/services/size.service";
import usePagination from "@/hooks/usePagination";
import { PaginatedData } from "@/interfaces/IPagination";

const useSizeTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const { pagination, setPagination, onPagination } = usePagination();
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
	}, [pagination.page, pagination.pageSize]);

	/**
	 * fetchData
	 * fetch services
	 */
	async function fetchData() {
		const data = await sizeService.getAll({
			page: pagination.page,
			pageSize: pagination.pageSize,
		});
		if (data) {
			setRows(data.items);
			setPagination(data.pagination);
		}
	}

	/**
	 * handleForm
	 * make petitions for post and put method
	 *
	 * @param {ISize} [data]
	 */
	async function handleForm(data?: ISize) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (size: ISize) =>
					sizeService.update({
						id: data.id,
						size,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		} else {
			request = {
				endpoint: (size: ISize) =>
					sizeService.create({
						size,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		}

		try {
			showFormModal<PaginatedData<ISize>>({
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

	async function remove(size: any) {
		try {
			customAlert.warning({ name: size.name }).then(async (response) => {
				if (response.isConfirmed) {
					try {
						const data = await sizeService.remove({
							id: size.id,
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
		remove,
		rows,
		pagination,
		onPagination,
	};
};

export default useSizeTable;
