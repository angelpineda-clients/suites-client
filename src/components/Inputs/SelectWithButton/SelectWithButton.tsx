import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props {
	id: string;
	label: string;
	items: { value: any; name: string }[];
	formField: object;
	handleButtonClick: (value: any) => any;
	required?: boolean;
	defaultValue?: number; // value of element
}

const SelectWithButton = ({
	id,
	label,
	items,
	formField,
	defaultValue,
	required = false,
	handleButtonClick,
}: Props) => {
	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<TextField
				select
				id={id}
				label={label}
				defaultValue={defaultValue}
				required={required}
				fullWidth
				{...formField}
			>
				{items.map((item) => {
					return (
						<MenuItem
							key={`${id}-select-${item.name}-${item.value}`}
							value={item.value}
						>
							{item.name}
						</MenuItem>
					);
				})}
			</TextField>
			<Button
				onClick={handleButtonClick}
				variant="outlined"
				sx={{
					ml: 2,
				}}
			>
				<Add />
			</Button>
		</Box>
	);
};

export default SelectWithButton;
