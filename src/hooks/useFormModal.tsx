import React from "react";
import { useForm } from "react-hook-form";
import { useModalContext } from "@/context/modals/ModalProvider";
import { useUiContext } from "@/context/ui/UiProvider";

interface IShowFormModal {
	title?: string;
	children: React.ReactNode;
	request: IRequest;
	alert?: object;
	onSubmit?: any;
}

export type IRequest = {
	endpoint: (data: any) => Promise<any>;
	headers?: object;
};

function useFormModal({ defaultValues = {} }) {
	const { setIsLoading } = useUiContext();
	const formHook = useForm(defaultValues);
	const { showModal } = useModalContext();

	function showFormModal<T>({
		title,
		children,
		request,
	}: IShowFormModal): Promise<T> {
		formHook.reset();

		return new Promise((resolve, reject) => {
			try {
				const { closeModal } = showModal({
					title: title,
					element: (
						<form
							style={{
								marginTop: "1rem",
								maxWidth: 850,
								width: "auto",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
							onSubmit={formHook.handleSubmit(
								async (data) => await onSubmit({ data, closeModal })
							)}
						>
							{children}
						</form>
					),
				});

				async function onSubmit({ data, closeModal }: any) {
					setIsLoading(true);
					try {
						const response = await request.endpoint(data);

						if (!response) {
							const message = "Error al realizar la peticion del formulario";
							reject(message);
						}

						closeModal();
						formHook.reset();
						return resolve(response);
					} catch (error) {
					} finally {
						setIsLoading(false);
					}
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	return { showFormModal, formHook };
}

export default useFormModal;
