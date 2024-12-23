// Función para formatear números a moneda
export function formatToCurrency(
	value: string | number,
	locale = "es-MX",
	currency = "MXN"
) {
	const amount = parseFloat(value.toString());

	if (isNaN(amount)) {
		return "";
	}

	// Formatear el número como moneda
	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	});

	return formatter.format(amount);
}
