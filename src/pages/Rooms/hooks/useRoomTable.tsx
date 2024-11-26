import { useState, useEffect } from "react";
/* components */
import usePagination from "@/hooks/usePagination";
import useFormModal, { IRequest } from "@/hooks/useFormModal";
/* helpers */
import { customAlert } from "@/helpers/alertHelper";
/* services */
import { roomService } from "@/services/room.service";
/* interfaces */
import { IRoom } from "@/interfaces/models/IRoom";
import { PaginatedData } from "@/interfaces/IPagination";
import RoomsForm from "../components/RoomsForm";

const useRoomTable = () => {
	const { showFormModal, formHook } = useFormModal({
		defaultValues: {
			name: "",
			alias: "",
		},
	});
	const { pagination, setPagination, onPagination } = usePagination();
	const [rows, setRows] = useState<IRoom[]>([]);

	useEffect(() => {
		fetchData();
	}, [pagination.page, pagination.pageSize]);

	/**
	 * fetchData
	 * fetch rooms
	 */
	async function fetchData() {
		const data = await roomService.getAll({
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
	 * @param {IRoom} [data]
	 */
	async function handleForm(data?: IRoom) {
		let request: IRequest;

		if (data?.id) {
			request = {
				endpoint: (room: IRoom) =>
					roomService.update({
						id: data.id,
						room,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		} else {
			request = {
				endpoint: (room: IRoom) =>
					roomService.create({
						room,
						page: pagination.page,
						pageSize: pagination.pageSize,
					}),
			};
		}

		try {
			showFormModal<PaginatedData<IRoom>>({
				title: data?.id ? "Editar cuarto." : "Crear cuarto.",
				children: <RoomsForm formHook={formHook} />,
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
	 * @param {IRoom} floor
	 */
	async function remove(room: IRoom) {
		try {
			customAlert.warning({ name: room.name }).then(async (response) => {
				if (response.isConfirmed) {
					const data = await roomService.remove({ id: room?.id });

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

export default useRoomTable;
