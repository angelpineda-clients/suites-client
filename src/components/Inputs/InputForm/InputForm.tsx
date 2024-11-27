import { Grid2, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface InputFormProps {
	id: string;
	formHook: UseFormReturn<FieldValues, any, undefined>;
	type?: string | "text" | "number";
	size?: number;
	defaultValue?: string | number;
	label?: string;
	required?: boolean;
}

const InputForm = ({
	id,
	formHook,
	type = "text",
	defaultValue = "",
	size = 6,
	label,
	required = false,
}: InputFormProps) => {
	const [value, setValue] = useState(defaultValue);
	const isError = formHook.formState.errors[id] ? true : false;
	const errorMessage = isError ? (
		<span>{formHook.formState.errors[id]?.message?.toString()}</span>
	) : (
		<span></span>
	);

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
			formHook.setValue(id, defaultValue);
		}
	}, [defaultValue]);

	function handleValue(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const value = event.target.value;
		setValue(value);
		formHook.setValue(id, value);
	}

	return (
		<Grid2 size={size}>
			<TextField
				id={id}
				label={label}
				type={type}
				value={value}
				onChange={handleValue}
				error={isError}
				required={required}
				multiline
				fullWidth
				helperText={errorMessage}
			/>
		</Grid2>
	);
};

export default InputForm;
