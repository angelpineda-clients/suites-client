import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IDataTable {
	title?: string;
	rows: any[];
	columns: GridColDef[];
	headerActions: JSX.Element;
}

const DataTable = ({ title, columns, rows, headerActions }: IDataTable) => {
	return (
		<Box
			sx={{
				border: "thin solid gray",
				padding: 2,
				borderRadius: "8px",
				width: "1100px",
				maxWidth: "90vw",
				my: 2,
				mx: "auto",
			}}
		>
			<Stack
				direction="row"
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h3" component="h2" my={2}>
					{title}
				</Typography>

				{headerActions}
			</Stack>
			<DataGrid
				rows={rows}
				columns={columns}
				disableRowSelectionOnClick
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5, 10, 15, 20, 50, 100]}
			/>
		</Box>
	);
};

export default DataTable;
