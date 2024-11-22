import { useState, useEffect } from "react";
/* libraries */
import { Button, Stack, TextField } from "@mui/material";
/* hooks */
import usePagination from "../../../../../hooks/usePagination";
import useFormModal, { IRequest } from "@/hooks/useFormModal";
/* servuces */
import { seasonService } from "@/services/season.service";
/* interfaces */
import { PaginatedData } from "@/interfaces/IPagination";
import { ISeason } from "@/interfaces/models";
/* helpers */
import { customAlert } from "@/helpers/alertHelper";
import SeasonForm from "../components/SeasonForm";

const useSeasonTable = () => {
	const [rows, setRows] = useState<ISeason[]>([]);
	const { pagination, setPagination, onPagination } = usePagination();
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
			initialDate: "",
			finalDate: "",
		},
	});

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
				children: <SeasonForm formHook={formHook} data={data} />,
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
