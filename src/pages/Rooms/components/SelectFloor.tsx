import { useState, useEffect } from "react";

import SelectWithButton from "@/components/Inputs/SelectWithButton/SelectWithButton";

import floorForm from "@/pages/Catalogs/components/CatalogFloor/utils/floorForm";

import useFormModal from "@/hooks/useFormModal";

import { floorService } from "@/services/floor.service";

import { customAlert } from "@/helpers/alertHelper";

import { IFloor } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";

interface Props {
	formField: object;
	data?: IFloor;
}

const PAGE = 0;
const PAGE_SIZE = 50;

/**
 * SelectFloor
 *
 * @param {Props} { formField, data }
 * @param {formField} object
 * @param {data} IFloor
 * @return {*}
 */
const SelectFloor = ({ formField, data }: Props) => {
	const [items, setItems] = useState<any[]>([]);
	const { showFormModal, formHook } = useFormModal({});

	useEffect(() => {
		getData();
	}, []);

	/**
	 * getData
	 * fetch data and create array of items for select
	 */
	async function getData() {
		const response = await floorService.getAll({
			page: PAGE,
			pageSize: PAGE_SIZE,
		});

		if (!response?.items) {
			return;
		}

		const items = response?.items.map((element) => {
			return {
				value: element.id,
				name: element.name,
			};
		});

		setItems(items);
	}

	function crateFloor() {
		try {
			showFormModal<PaginatedData<IFloor>>(
				floorForm({
					formHook,
					page: PAGE,
					pageSize: PAGE_SIZE,
				})
			).then((response) => {
				if (response) {
					customAlert.success();

					if (!response.items) {
						return;
					}

					const items = response?.items.map((element) => {
						return {
							value: element.id,
							name: element.name,
						};
					});

					setItems(items);
				}
			});
		} catch (error) {}
	}

	return (
		<SelectWithButton
			id="floor"
			label="Piso"
			items={items}
			formField={formField}
			defaultValue={data?.id}
			handleButtonClick={crateFloor}
		/>
	);
};

export default SelectFloor;
