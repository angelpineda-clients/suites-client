import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { IRoomResponse } from "@/interfaces/IRoomResponse";

import { roomService } from "@/services/room.service";

import RoomDetailsImages from "./components/RoomDetailsImages/RoomDetailsImages";
import { useUiContext } from "@/context/ui/UiProvider";
import RoomPriceTable from "./components/RoomPriceTable/RoomPriceTable";
import RoomFormDetails from "./components/RoomFromDetails/RoomFromDetails";
import { customAlert } from "@/helpers/alertHelper";

const RoomDetails = () => {
	const [searchParams] = useSearchParams();
	const { setIsLoading } = useUiContext();
	const [data, setData] = useState<IRoomResponse>({} as IRoomResponse);

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		const id = searchParams.get("id");

		if (id) {
			roomService.show(id).then((data) => {
				setData(data);
			});
		}
	}

	function onSubmit(room: any) {
		try {
			setIsLoading(true);
			roomService
				.update({
					id: data.id,
					room,
				})
				.then((data) => {
					setData(data);
					customAlert.success();
				});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<RoomFormDetails data={data} onSubmit={onSubmit} />

			<RoomDetailsImages roomID={data.id} />

			<RoomPriceTable roomID={data.id} />
		</Container>
	);
};

export default RoomDetails;
