import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IDataTable {
	title?: string;
	rows: any[];
	columns: GridColDef[];
	onCreateRow: (value: any) => void;
}

const DataTable = ({ title, columns, rows, onCreateRow }: IDataTable) => {
	return (
		<Box
			sx={{
				border: "thin solid gray",
				mt: 4,
				padding: 2,
				borderRadius: "8px",
				width: "100%",
				maxWidth: "75vw",
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
				<Button
					variant="contained"
					sx={{
						p: 1,
					}}
					onClick={onCreateRow}
				>
					Create Row
				</Button>
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
