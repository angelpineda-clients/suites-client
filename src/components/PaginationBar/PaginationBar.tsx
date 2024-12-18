import { Pagination } from "rsuite";

interface Props {
	pagination: any;
	onPagination: any;
}

const PaginationBar = ({ pagination, onPagination }: Props) => {
	return (
		<div
			style={{
				width: "80%",
				margin: "0 auto",
				boxShadow: "rgba(0,0,0,0.2) 0px 0px 4px",
				borderRadius: "12px",
				padding: "8px",
			}}
		>
			<Pagination
				layout={["total", "-", "pager", "|", "limit", "skip"]}
				size="lg"
				activePage={pagination.page + 1}
				maxButtons={3}
				total={pagination.total}
				limit={pagination.pageSize}
				boundaryLinks={true}
				ellipsis={true}
				first={true}
				last={true}
				limitOptions={[5, 10, 20, 50]}
				onChangePage={(value: number) =>
					onPagination({
						page: value - 1,
						pageSize: pagination.pageSize,
					})
				}
				onChangeLimit={(value: number) =>
					onPagination({
						page: pagination.page - 1,
						pageSize: value,
					})
				}
			/>
		</div>
	);
};

export default PaginationBar;
