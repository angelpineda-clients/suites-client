import { useMemo, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { Pagination } from "@/interfaces/IPagination";

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
	columns = [],
	rows = [],
	pagination = {
		page: 0,
		pageSize: 5,
		total: 0,
		lastPage: 0,
		from: 0,
		to: 0,
	},
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

	const customLocaleText = {
		...esES.components.MuiDataGrid.defaultProps.localeText,
		rowsPerPage: "Filas por página:",
	};

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
				localeText={customLocaleText}
			/>
		</Box>
	);
};

export default DataTable;
