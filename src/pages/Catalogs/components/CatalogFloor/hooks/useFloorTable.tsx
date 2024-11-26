import { useState, useEffect } from "react";
/* components */
import usePagination from "@/hooks/usePagination";
import useFormModal from "@/hooks/useFormModal";
/* helpers */
import { customAlert } from "@/helpers/alertHelper";
/* services */
import { floorService } from "@/services/floor.service";
/* interfaces */
import { IFloor } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";
import floorForm from "../utils/floorForm";

/**
 * useFloorTable
 * handle data, crud and pagination for CatalogFloor
 * @return {object}
 * fetchData,
 * handleForm,
 * remove,
 * onPagination,
 * rows,
 * pagination,
 */
const useFloorTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const { pagination, setPagination, onPagination } = usePagination();
	const [rows, setRows] = useState<IFloor[]>([]);

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
		try {
			showFormModal<PaginatedData<IFloor>>(
				floorForm({
					data,
					formHook,
					page: pagination.page,
					pageSize: pagination.pageSize,
				})
			).then((data) => {
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
