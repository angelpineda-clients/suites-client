import { useState, useEffect } from "react";
/* components */
import useFormModal from "@/hooks/useFormModal";
import { serviceService } from "@/services/services.service";
import { customAlert } from "@/helpers/alertHelper";
import { IService } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";
import usePagination from "@/hooks/usePagination";
import { serviceForm } from "../utils/serviceForm";

const useServiceTable = () => {
	const { showFormModal, formHook } = useFormModal({});
	const [rows, setRows] = useState<IService[]>([]);
	const { pagination, setPagination, onPagination } = usePagination();

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
		try {
			showFormModal<PaginatedData<IService>>(
				serviceForm({
					data,
					formHook,
					page: pagination.page,
					pageSize: pagination.pageSize,
				})
			).then((response) => {
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
