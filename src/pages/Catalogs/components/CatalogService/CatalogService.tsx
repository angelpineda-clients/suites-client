/* Libraries */
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
/* components */
import DataTable from "@/components/DataTable/DataTable";
import useServiceTable from "@/hooks/useServiceTable";
import { Button, Stack } from "@mui/material";

const CatalogService = () => {
	const { rows, handleForm, deleteService } = useServiceTable();
	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "#",
		},
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
						<Button onClick={() => handleForm(data)} variant="contained">
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
			onClick={() => handleForm()}
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
		/>
	);
};

export default CatalogService;