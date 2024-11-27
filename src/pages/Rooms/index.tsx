import React from "react";

import { GridColDef } from "@mui/x-data-grid";
import { Button, Container, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import DataTable from "@/components/DataTable/DataTable";

import useRoomTable from "./hooks/useRoomTable";
import { formatToCurrency } from "@/utils/FormatToCurrency";

const Rooms = () => {
	const { rows, handleForm, remove, pagination, onPagination } = useRoomTable();

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Nombre",
			minWidth: 250,
		},
		{
			field: "description",
			headerName: "Descripción",
			minWidth: 250,
		},
		{
			field: "price",
			headerName: "Precio",
			minWidth: 250,
			valueFormatter: (value?: string) => {
				if (value == null) {
					return "";
				}

				const newValue = formatToCurrency(value);

				return newValue;
			},
		},
		{
			field: "capacity",
			headerName: "Capacidad",
			minWidth: 250,
		},
		{
			field: "beds",
			headerName: "Camas",
			minWidth: 250,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Acciones",
			cellClassName: "actions",
			minWidth: 250,
			renderCell: (params) => {
				const data = params.row;
				return (
					<Stack direction="row" gap={1}>
						<Button
							onClick={(
								event: React.MouseEvent<HTMLButtonElement, MouseEvent>
							) => {
								event.currentTarget.blur();
								handleForm(data);
							}}
							variant="contained"
						>
							Editar <Edit />
						</Button>
						<Button
							onClick={() => remove(data)}
							variant="contained"
							color="error"
						>
							Eliminar <Delete />
						</Button>
					</Stack>
				);
			},
		},
	];

	const headerAction = (
		<Button
			variant="contained"
			sx={{
				p: 1,
			}}
			onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				event.currentTarget.blur();
				handleForm();
			}}
		>
			Crear cuarto
		</Button>
	);
	return (
		<Container>
			<DataTable
				title="Cuartos"
				rows={rows}
				columns={columns}
				headerActions={headerAction}
				pagination={pagination}
				onPagination={onPagination}
			/>
		</Container>
	);
};

export default Rooms;
