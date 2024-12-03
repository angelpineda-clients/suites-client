import { Button, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import DataTable from "@/components/DataTable/DataTable";

import usePriceTable from "./hooks/usePriceTable";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
	roomID: string;
}

const RoomPriceTable = ({ roomID }: Props) => {
	const { pagination, onPagination, rows, handleForm, remove } = usePriceTable({
		roomID,
	});

	const columns: GridColDef[] = [
		{ field: "seasonName", headerName: "Temporada", width: 150 },
		{ field: "seasonInitialDate", headerName: "Fecha inicial", width: 150 },
		{ field: "seasonFinalDate", headerName: "Fecha final", width: 150 },
		{ field: "amount", headerName: "Monto", width: 150 },
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
							onClick={() => remove(params.row)}
							variant="contained"
							color="error"
						>
							Eliminar <Delete />
						</Button>
					</Stack>
				);
			},
		},
		,
	];

	return (
		<DataTable
			rows={rows}
			columns={columns}
			headerActions={
				<Button variant="contained" onClick={handleForm}>
					Agregar
				</Button>
			}
			title="Precio por temporada"
			pagination={pagination}
			onPagination={onPagination}
		/>
	);
};

export default RoomPriceTable;
