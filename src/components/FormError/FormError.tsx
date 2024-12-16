interface Props {
	text: string;
}

const FormError = ({ text }: Props) => {
	return (
		<span
			style={{
				color: "red",
			}}
		>
			{text}
		</span>
	);
};

export default FormError;
