import { useState, useEffect } from "react";

import SelectWithButton from "@/components/Inputs/SelectWithButton/SelectWithButton";

import useFormModal from "@/hooks/useFormModal";

import sizeForm from "@/pages/Catalogs/components/CatalogSize/utils/sizeForm";

import { sizeService } from "@/services/size.service";

import { customAlert } from "@/helpers/alertHelper";

import { ISize } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props {
	form: UseFormReturn<FieldValues, any, undefined>;
	defaultValue?: number;
}

const PAGE = 0;
const PAGE_SIZE = 50;

/**
 * SelectSize
 *
 * @param {Props} { formField, data }
 * @param {formField} object
 * @param {data} ISize
 * @return {*}
 */
const SelectSize = ({ form, defaultValue }: Props) => {
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
		const response = await sizeService.getAll({
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

	function crateSize() {
		try {
			showFormModal<PaginatedData<ISize>>(
				sizeForm({
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
			id="size_id"
			label="Tamanio"
			items={items}
			form={form}
			defaultValue={defaultValue}
			handleButtonClick={crateSize}
		/>
	);
};

export default SelectSize;
