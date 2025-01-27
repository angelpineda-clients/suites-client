import { useEffect, useState } from "react";

import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid2,
	Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { serviceService } from "@/services/services.service";
import { IService } from "@/interfaces/models";
import { Service } from "@/interfaces/IRoomResponse";
import useFormModal from "@/hooks/useFormModal";
import { serviceForm } from "@/pages/Catalogs/components/CatalogService/utils/serviceForm";
import { customAlert } from "@/helpers/alertHelper";

interface Props {
	formHook: UseFormReturn<FieldValues, any, undefined>;
	defaultValue?: IService[] | Service[];
}

const CheckServices = ({ formHook, defaultValue }: Props) => {
	const [values, setValues] = useState<number[]>([]);
	const [items, setItems] = useState<any[]>([]);
	const { showFormModal, formHook: serviceFormHook } = useFormModal({});

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getServicesID();
	}, [defaultValue]);

	function getServicesID() {
		if (!defaultValue) {
			return;
		}

		const valuesArray = defaultValue.map((service) => service.id);

		setValues(valuesArray);
	}

	async function getData() {
		try {
			const response = await serviceService.getAll({
				pageSize: 50,
			});

			if (response?.items) {
				const items = response.items.map((item) => {
					return {
						value: item.id,
						label: item.name,
					};
				});

				setItems(items);
			}
		} catch (error) {}
	}

	function handleChange(id: number) {
		const isActive = values.some((value) => value == id);

		if (isActive) {
			const newValues = values.filter((value) => value !== id);

			setValues(newValues);
			formHook.setValue("services", newValues);
		} else {
			const newValues = [...values, id];
			setValues(newValues);
			formHook.setValue("services", newValues);
		}
	}

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
		>
			<FormControl
				sx={{
					border: "thin solid gray",
					borderRadius: "4px",
					padding: "8px",
				}}
				fullWidth
			>
				<Stack direction="row" justifyContent="space-between">
					<FormLabel component="legend">Servicios</FormLabel>
					<Button
						variant="outlined"
						onClick={() =>
							showFormModal(
								serviceForm({
									formHook: serviceFormHook,
								})
							).then((response) => {
								if (response) {
									customAlert.success();
									getData();
								}
							})
						}
						sx={{ mb: 1, padding: "15px" }}
					>
						<Add />
					</Button>
				</Stack>
				<FormGroup
					id="services"
					sx={{
						px: 2,
					}}
				>
					<Grid2 container spacing={2}>
						{items.map((item) => {
							const isActive = values.some((value) => value == item.value);

							return (
								<FormControlLabel
									key={`service-${item.label}-${item.value}`}
									control={
										<Checkbox
											checked={isActive}
											onChange={() => handleChange(item.value)}
											name={item.label}
										/>
									}
									label={item.label}
									sx={{
										display: "flex",
										width: "max-content",
									}}
								/>
							);
						})}
					</Grid2>
				</FormGroup>
			</FormControl>
		</div>
	);
};

export default CheckServices;
