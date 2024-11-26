import { useState, useEffect } from "react";

import { sizeService } from "@/services/size.service";

import useFormModal from "@/hooks/useFormModal";
import usePagination from "@/hooks/usePagination";

import { customAlert } from "@/helpers/alertHelper";

import { ISize } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";

import sizeForm from "../utils/sizeForm";

const useSizeTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const { pagination, setPagination, onPagination } = usePagination();
	const [rows, setRows] = useState<ISize[]>([]);

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
		try {
			showFormModal<PaginatedData<ISize>>(
				sizeForm({
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
