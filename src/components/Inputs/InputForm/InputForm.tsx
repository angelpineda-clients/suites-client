import { Grid2, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface InputFormProps {
	id: string;
	formHook: UseFormReturn<FieldValues, any, undefined>;
	formField: object;
	type?: string | "text" | "number";
	size?: number;
	defaultValue?: string | number;
	label?: string;
	required?: boolean;
}

const InputForm = ({
	id,
	formHook,
	formField,
	type = "text",
	defaultValue,
	size = 6,
	label,
	required = false,
}: InputFormProps) => {
	const isError = formHook.formState.errors[id] ? true : false;
	const errorMessage = isError ? (
		<span>{formHook.formState.errors[id]?.message?.toString()}</span>
	) : (
		<span></span>
	);

	return (
		<Grid2 size={size}>
			<TextField
				id={id}
				label={label}
				type={type}
				defaultValue={defaultValue || ""}
				error={isError}
				required={required}
				fullWidth
				helperText={errorMessage}
				{...formField[id]}
			/>
		</Grid2>
	);
};

export default InputForm;
