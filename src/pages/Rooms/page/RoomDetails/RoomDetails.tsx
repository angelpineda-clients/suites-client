import { IRoomResponse } from "@/interfaces/IRoomResponse";
import { roomService } from "@/services/room.service";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckServices from "../../components/CheckServices";
import { useForm } from "react-hook-form";
import SelectSize from "../../components/SelectSize";
import InputForm from "@/components/Inputs/InputForm/InputForm";
import InputCurrencyForm from "@/components/Inputs/InputCurrency/InputCurrencyForm";
import SelectFloor from "../../components/SelectFloor";
import { useUiContext } from "@/context/ui/UiProvider";
import RoomDetailsImages from "./components/RoomDetailsImages/RoomDetailsImages";
import RoomPriceTable from "./components/RoomPriceTable/RoomPriceTable";

const RoomDetails = () => {
	const formHook = useForm();
	const [data, setData] = useState<IRoomResponse>({} as IRoomResponse);
	const [searchParams] = useSearchParams();
	const { setIsLoading } = useUiContext();
	const formFields = {
		name: formHook.register("name", {
			required: {
				value: true,
				message: "Campo requerido",
			},
			value: data?.name,
		}),
		price: formHook.register("price", {
			required: {
				value: true,
				message: "Campo requerido",
			},
		}),
		capacity: formHook.register("capacity", {
			valueAsNumber: true,
			value: 0,
		}),
		beds: formHook.register("beds", {
			valueAsNumber: true,
			value: 0,
		}),
		floor: formHook.register("floor_id", {}),
		size: formHook.register("size_id", {}),
		services: formHook.register("services", {}),
		description: formHook.register("description", {}),
	};

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		const id = searchParams.get("id");

		if (id) {
			roomService.show(id).then((data) => setData(data));
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
				.then((data) => setData(data));
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<form
				style={{
					marginTop: "40px",
					border: "thin solid gray",
					borderRadius: "8px",
					padding: "24px 12px",
				}}
				onSubmit={formHook.handleSubmit(onSubmit)}
			>
				<Grid container spacing={2}>
					<InputForm
						id="name"
						label="Nombre"
						required
						defaultValue={data?.name}
						formHook={formHook}
					/>
					<Grid size={6} display="flex" justifyContent="end">
						<Button
							type="submit"
							variant="contained"
							data-testid="login-submit"
						>
							Guardar
						</Button>
					</Grid>
					<InputForm
						id="description"
						label="Descripcion"
						defaultValue={data?.description}
						formHook={formHook}
						size={12}
					/>
					<InputCurrencyForm
						id="price"
						label="Precio"
						defaultValue={data?.price}
						required
						formHook={formHook}
						size={2}
					/>

					<InputForm
						id="capacity"
						label="Capacidad"
						type="number"
						defaultValue={data?.capacity}
						formHook={formHook}
						size={2}
					/>

					<InputForm
						id="beds"
						label="Camas"
						type="number"
						defaultValue={data?.beds}
						formHook={formHook}
						size={2}
					/>

					<Grid size={3}>
						<SelectFloor defaultValue={data?.floor_id} form={formHook} />
					</Grid>

					<Grid size={3}>
						<SelectSize form={formHook} defaultValue={data?.size_id} />
					</Grid>

					<Grid size={12}>
						<CheckServices formHook={formHook} defaultValue={data?.services} />
					</Grid>
				</Grid>
			</form>

			<RoomDetailsImages roomID={data.id} />

			<RoomPriceTable roomID={data.id} />
		</Container>
	);
};

export default RoomDetails;
