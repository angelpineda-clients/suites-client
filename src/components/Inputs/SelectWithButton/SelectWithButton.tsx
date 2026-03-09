import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { AppButton } from "@/components/AppButton/AppButton";

interface Props {
  id: string;
  label: string;
  items: { value: any; name: string }[];
  form: UseFormReturn<FieldValues, any, undefined>;
  handleButtonClick: (value: any) => any;
  required?: boolean;
  defaultValue?: number; // value of element
}

const SelectWithButton = ({
  id,
  label,
  items,
  form,
  defaultValue = 0,
  required = false,
  handleButtonClick,
}: Props) => {
  const [value, setValue] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  function handleChange(event: SelectChangeEvent) {
    const value = event.target.value;

    setValue(Number(value));
    form.setValue(id, value);
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value?.toString()}
          label={label}
          required={required}
          onChange={handleChange}
        >
          {items.map((item) => {
            return (
              <MenuItem key={`${id}-select-${item.name}-${item.value}`} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <AppButton
        onClick={handleButtonClick}
        appVariant="ghost"
        sx={{
          ml: 2,
        }}
      >
        <Add />
      </AppButton>
    </Box>
  );
};

export default SelectWithButton;
