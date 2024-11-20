/* Libraries */
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
/* components */
import DataTable from "@/components/DataTable/DataTable";
import useServiceTable from "@/hooks/useServiceTable";
import { Button, Stack } from "@mui/material";

const CatalogService = () => {
	const { rows, pagination, handleForm, deleteService, onPagination } =
		useServiceTable();
	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Servicio",
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
							onClick={() => deleteService(params.row)}
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
			Crear servicio
		</Button>
	);

	return (
		<DataTable
			title="Servicios"
			rows={rows}
			columns={columns}
			headerActions={headerAction}
			pagination={pagination}
			onPagination={onPagination}
		/>
	);
};

export default CatalogService;
