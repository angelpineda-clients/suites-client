/* libraries */
import { Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
/* Components */
import { useModalContext } from "../ModalProvider";
/* Interfaces */
import { IModal } from "../interfaces/Modal";
/* Styles */
import "../styles/modal.css";

interface Props {
	modals: IModal[];
}

const ModalContainer = ({ modals }: Props) => {
	const { removeModal } = useModalContext();
	return (
		<>
			{modals?.map(({ id, title, element }) => (
				<Modal
					key={id}
					open={true}
					onClose={() => removeModal(id)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					className="modal"
				>
					<Stack className="modal_container">
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							paddingBottom={2}
						>
							<Typography variant="h3" component="h3">
								{title}
							</Typography>
							<Button onClick={() => removeModal(id)} variant="contained">
								<Close />
							</Button>
						</Stack>
						<Divider />
						{element}
					</Stack>
				</Modal>
			))}
		</>
	);
};

export default ModalContainer;
