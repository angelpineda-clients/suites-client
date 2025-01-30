import { useEffect } from "react";

import { useBookingStore } from "@/store/booking";

const SuccessOrder = () => {
	const setBooking = useBookingStore((state) => state.setBooking);

	useEffect(() => {
		setBooking({
			check_in: null,
			check_out: null,
			adults: "2",
			children: "0",
		});
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
