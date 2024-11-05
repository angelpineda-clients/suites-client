/* Libraries */
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
/* components */
import DataTable from "@/components/DataTable/DataTable";
import useServiceTable from "./hooks/useServiceTable";
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
				return (
					<Stack direction="row" gap={1}>
						<Button
							onClick={() => handleForm({ data: params.row })}
							variant="contained"
						>
							Editar <Edit />
						</Button>
						<Button
							onClick={() => deleteService(params.row)}
							variant="contained"
						>
							Eliminar <Delete />{" "}
						</Button>
					</Stack>
				);
			},
		},
	];

	return (
		<DataTable
			title="Servicios"
			rows={rows}
			columns={columns}
			onCreateRow={handleForm}
		/>
	);
};

export default CatalogService;
