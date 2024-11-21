import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* components */
import usePagination from "@/hooks/usePagination";
import useFormModal, { IRequest } from "@/hooks/useFormModal";
/* helpers */
import { customAlert } from "@/helpers/alertHelper";
/* services */
import { floorService } from "@/services/floor.service";
/* interfaces */
import { IFloor } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";

const useFloorTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const { pagination, setPagination, onPagination } = usePagination();
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
	}, [pagination.page, pagination.pageSize]);

	/**
	 * fetchData
	 * fetch services
	 */
	async function fetchData() {
		const data = await floorService.getAll({
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
	 * @param {IFloor} [data]
	 */
	async function handleForm(data?: IFloor) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (floor: IFloor) =>
					floorService.update({
						id: data.id,
						floor,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		} else {
			request = {
				endpoint: (floor: IFloor) =>
					floorService.create({
						floor,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		}

		try {
			showFormModal<PaginatedData<IFloor>>({
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

	/**
	 * deleteService
	 *
	 * @param {IFloor} floor
	 */
	async function remove(floor: IFloor) {
		try {
			customAlert.warning({ name: floor.name }).then(async (response) => {
				if (response.isConfirmed) {
					const data = await floorService.remove({ id: floor?.id });

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
		onPagination,
		rows,
		pagination,
	};
};

export default useFloorTable;
