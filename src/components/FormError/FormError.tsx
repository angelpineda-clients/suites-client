import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type formHookError =
	| string
	| FieldError
	| Merge<FieldError, FieldErrorsImpl<any>>
	| undefined;

interface Props {
	text: formHookError;
}

const FormError = ({ text }: Props) => {
	return (
		<span
			style={{
				color: "red",
			}}
		>
			{text == "string" ? text : ""}
		</span>
	);
};

export default FormError;
