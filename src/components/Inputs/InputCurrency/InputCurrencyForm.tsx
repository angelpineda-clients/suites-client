import { forwardRef } from "react";
import { Grid2, TextField } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface InputFormProps {
	id: string;
	formHook: UseFormReturn<FieldValues, any, undefined>;
	size?: number;
	defaultValue?: string | number;
	label?: string;
	required?: boolean;
}

const InputCurrencyForm = ({
	id,
	label,
	required = false,
	formHook,
	size = 6,
	defaultValue,
}: InputFormProps) => {
	const isError = formHook.formState.errors[id] ? true : false;
	const errorMessage = isError ? (
		<span
			style={{
				color: "red",
			}}
		>
			{formHook.formState.errors[id]?.message?.toString()}
		</span>
	) : (
		<span></span>
	);

	const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
		function NumericFormatCustom(props, ref) {
			const { onChange, ...other } = props;

			return (
				<NumericFormat
					{...other}
					getInputRef={ref}
					onValueChange={(values) => {
						onChange({
							target: {
								name: props.name,
								value: values.value,
							},
						});
					}}
					thousandSeparator
					valueIsNumericString
					prefix="$"
				/>
			);
		}
	);

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const value = event.target.value;
		formHook.setValue(id, value);
	}

	return (
		<Grid2 size={size}>
			<TextField
				id={id}
				label={label}
				error={isError}
				required={required}
				defaultValue={defaultValue}
				onChange={(e) => handleChange(e)}
				fullWidth
				slotProps={{
					input: {
						inputComponent: NumericFormatCustom as any,
					},
				}}
				helperText={errorMessage}
			/>
		</Grid2>
	);
};

export default InputCurrencyForm;
