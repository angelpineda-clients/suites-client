import { Pagination } from "@/interfaces/IPagination";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useRef } from "react";

interface IDataTable {
	title?: string;
	rows: any[];
	columns: GridColDef[];
	pagination: Pagination;
	headerActions: JSX.Element;
	onPagination: (pagination: any) => void;
}

const DataTable = ({
	title,
	columns,
	rows,
	pagination,
	headerActions,
	onPagination,
}: IDataTable) => {
	const rowCountRef = useRef(pagination?.total || 0);

	const rowCount = useMemo(() => {
		if (pagination?.total !== undefined) {
			rowCountRef.current = pagination.total;
		}

		return rowCountRef.current;
	}, [pagination?.total, pagination.pageSize]);

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
				rowCount={rowCount}
				disableRowSelectionOnClick
				paginationMode="server"
				paginationModel={pagination}
				pageSizeOptions={[5, 10, 15, 25, 50, 100]}
				onPaginationModelChange={onPagination}
			/>
		</Box>
	);
};

export default DataTable;
