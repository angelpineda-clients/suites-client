/* Libraries */
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
/* components */
import DataTable from "@/components/DataTable/DataTable";
import useSizeTable from "@/hooks/useSizeTable";

const CatalogSize = () => {
	const { rows, handleForm, deleteService } = useSizeTable();
	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "#",
		},
		{
			field: "name",
			headerName: "Tamaño",
			minWidth: 250,
		},
		{
			field: "alias",
			headerName: "Alias",
			minWidth: 200,
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
			Crear tamaño
		</Button>
	);

	return (
		<DataTable
			title="Tamaños"
			rows={rows}
			columns={columns}
			headerActions={headerAction}
		/>
	);
};

export default CatalogSize;
