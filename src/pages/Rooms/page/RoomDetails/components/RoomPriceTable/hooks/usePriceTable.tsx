import { customAlert } from "@/helpers/alertHelper";
import useFormModal from "@/hooks/useFormModal";
import usePagination from "@/hooks/usePagination";
import { PaginatedData } from "@/interfaces/IPagination";
import { IPriceData, priceService } from "@/services/price.service";
import { useEffect, useState } from "react";
import PriceForm from "../components/PriceForm";

interface Props {
	roomID: string;
}

const usePriceTable = ({ roomID }: Props) => {
	const { pagination, setPagination, onPagination } = usePagination();
	const { showFormModal, formHook } = useFormModal({});
	const [rows, setRows] = useState<any[]>([]);

	useEffect(() => {
		fetchData();
	}, [roomID]);

	/**
	 * fetchData
	 * fetch prices with season
	 */
	async function fetchData() {
		if (!roomID) return;

		const response = await priceService.getAll({
			roomID,
			page: pagination.page,
			pageSize: pagination.pageSize,
		});

		if (response.items) {
			setRows(response.items);
			setPagination(response.pagination);
		}
	}

	/**
	 * handleForm
	 * make petitions for post and put method
	 *
	 * @param {IFloor} [data]
	 */
	async function handleForm(data?: IPriceData) {
		let request = data?.id
			? {
					endpoint: (newData: IPriceData) =>
						priceService.update({
							id: data?.id,
							data: newData,
							page: pagination.page,
							pageSize: pagination.pageSize,
						}),
				}
			: {
					endpoint: (newData: IPriceData) =>
						priceService.create({
							data: newData,
							page: pagination.page,
							pageSize: pagination.pageSize,
						}),
				};

		try {
			showFormModal<PaginatedData<any>>({
				title: data?.id ? "Editar precio" : "Agregar precio",
				children: (
					<PriceForm
						data={data}
						roomID={roomID}
						rows={rows}
						formHook={formHook}
					/>
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
	async function remove(price: any) {
		try {
			customAlert
				.warning({
					name: price?.seasonName,
					text: `¿Deseas eliminar el precio de ${price.seasonName}? `,
				})
				.then(async (response) => {
					if (response.isConfirmed) {
						const data = await priceService.remove({
							id: price?.id,
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
		pagination,
		onPagination,
		handleForm,
		remove,
		rows,
	};
};

export default usePriceTable;
