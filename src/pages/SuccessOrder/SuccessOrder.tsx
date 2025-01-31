import { handleLocalStorage } from "@/helpers/handleLocalStorage";
import { useEffect } from "react";

const SuccessOrder = () => {
	useEffect(() => {
		handleLocalStorage.removeItem("booking");
		handleLocalStorage.removeItem("clientSecret");
	}, []);

	return (
		<div>
			<ul>
				<li>Mostrar mensaje bonito</li>
				<li>Mostrar correo al que se envio la reserva</li>
				<li>Boton para descargar en PDF la reserva hecha.</li>
				<li>Boton (Ir al inicio)</li>
			</ul>
			<p>Redireccionar si no existe un Payment intent valido</p>
		</div>
	);
};

export default SuccessOrder;
