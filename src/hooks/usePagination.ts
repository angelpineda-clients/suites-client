import { useState } from "react";

interface Props {
	page?: number;
	pageSize?: number;
}

const usePagination = ({ page, pageSize }: Props = {}) => {
	const [pagination, setPagination] = useState({
		page: page || 0,
		pageSize: pageSize || 5,
		total: 0,
		lastPage: 0,
		from: 0,
		to: 0,
	});

	function onPagination({ page, pageSize }: Props) {
		setPagination({
			...pagination,
			page: page || 0,
			pageSize: pageSize || 5,
		});
	}

	return {
		pagination,
		onPagination,
		setPagination,
	};
};

export default usePagination;
