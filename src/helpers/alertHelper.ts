import Swal from "sweetalert2";

type IAlert = {
	title?: string;
	text?: string;
	name?: string;
};

const GLOBALS = {
	target: "header",
};

const CONSTANTS = {
	timerProgressBar: true,
	timer: 2500,
};

export const customAlert = {
	success: ({ title, text }: IAlert = {}) => {
		return Swal.fire({
			...GLOBALS,
			...CONSTANTS,
			title: title || "Todo bien!",
			text: text || "",
			icon: "success",
			focusConfirm: true,
			confirmButtonText: "Aceptar",
		});
	},
	warning: ({ title, text, name }: IAlert) => {
		return Swal.fire({
			...GLOBALS,
			title: title || "¡Cuidado!",
			text: text || `¿Deseas eleminar a ${name || "este recurso"}? `,
			icon: "warning",
			showConfirmButton: true,
			confirmButtonColor: "#ff5733",
			confirmButtonText: "Eliminar",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			cancelButtonColor: "#1f1f1f",
		});
	},
};
