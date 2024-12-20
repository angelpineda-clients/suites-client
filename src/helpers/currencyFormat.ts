const formatNumberToPesosMX = new Intl.NumberFormat("es-MX", {
	style: "currency",
	currency: "MXN",
});

export default formatNumberToPesosMX;
