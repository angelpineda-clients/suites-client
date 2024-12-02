import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { imageService } from "@/services/image.service";
import { customAlert } from "@/helpers/alertHelper";
import useFormModal from "@/hooks/useFormModal";
import UploadImages from "@/pages/Rooms/components/UploadImages";
import { useUiContext } from "@/context/ui/UiProvider";

interface Props {
	roomID: number;
}

const ENTITY_MODEL_NAME = "room";

const RoomDetailsImages = ({ roomID }: Props) => {
	const [images, setImages] = useState<any[]>([] as any[]);
	const { showFormModal, formHook } = useFormModal({});
	const { setIsLoading } = useUiContext();

	const formFields = {
		images: formHook.register("images", {
			required: true,
		}),
	};

	useEffect(() => {
		getImagesByRoom();
		console.log(roomID);
	}, [roomID]);

	/**
	 * getImagesByRoom
	 * fetch images for room details
	 * @return {*}
	 */
	function getImagesByRoom() {
		if (!roomID) {
			return;
		}

		imageService
			.getAll({ entityID: roomID, entityModelName: ENTITY_MODEL_NAME })
			.then((response) => setImages(response));
	}

	function onDelete(imageID: number) {
		customAlert.warning({ name: "" }).then(async (response) => {
			try {
				if (response.isConfirmed) {
					setIsLoading(true);

					const data = await imageService.remove({
						id: imageID,
						entityID: roomID,
						entityModelName: ENTITY_MODEL_NAME,
					});

					if (data) {
						setImages(data);

						customAlert.success();
					}
				}
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		});
	}

	function onAdd() {
		showFormModal({
			title: "Agregar imagen",
			children: (
				<>
					<UploadImages formHook={formHook} />
					<Button
						variant="contained"
						type="submit"
						sx={{
							maxWidth: "50%",
							margin: "0 auto",
							alignSelf: "end",
						}}
					>
						Guardar
					</Button>
				</>
			),
			request: {
				endpoint: (images: any) =>
					imageService.create({
						images: images,
						entityID: roomID,
						entityModelName: ENTITY_MODEL_NAME,
					}),
			},
		}).then((response) => setImages(response));
	}

	return (
		<Box
			sx={{
				marginTop: 4,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignContent: "center",
					margin: "24px auto",
				}}
			>
				<Typography variant="h4" component="h2">
					Imagenes
				</Typography>

				<Button variant="outlined" onClick={onAdd}>
					Agregar
				</Button>
			</Box>

			{images.length < 1 ? (
				<Typography variant="h6" component="p">
					No imagenes
				</Typography>
			) : (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						overflowX: "auto",
						border: "1px solid #ccc",
						padding: "24px",
						borderRadius: "4px",
					}}
				>
					{images.map((image) => (
						<Box
							key={image.id}
							sx={{
								position: "relative",
								marginRight: "8px",
							}}
						>
							<img
								src={image.url}
								alt={`Image ${image.id}`}
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: "4px",
									border: "1px solid #ccc",
								}}
							/>
							<IconButton
								onClick={() => onDelete(image.id)}
								sx={{
									position: "absolute",
									top: "-10px",
									right: "-10px",
									backgroundColor: "red",
									color: "#fff",
									"&:hover": { backgroundColor: "darkred" },
								}}
								size="small"
							>
								<Delete fontSize="small" />
							</IconButton>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};

export default RoomDetailsImages;
