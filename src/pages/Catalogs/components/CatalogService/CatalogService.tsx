/* Libraries */
import {
	GridActionsCellItem,
	GridColDef,
	GridRowModes,
} from "@mui/x-data-grid";
import { Edit, Delete, Cancel, Save } from "@mui/icons-material";
/* components */
import DataTable from "@/components/DataTable/DataTable";
import useServiceTable from "./hooks/useServiceTable";
import { Button } from "@mui/material";

const CatalogService = () => {
	const { handleForm, rows, deleteService } = useServiceTable();
	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "#",
		},
		{
			field: "name",
			headerName: "Servicio",
			minWidth: 200,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Acciones",
			cellClassName: "actions",
			minWidth: 200,
			renderCell: (params) => {
				return (
					<>
						<Button onClick={() => handleForm({ data: params.row })}>
							Editar
						</Button>
						<Button onClick={() => deleteService(params.row)}>Eliminar</Button>
					</>
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
