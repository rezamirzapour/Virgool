import { Select as MaterialSelect, MenuItem, SelectProps } from "@mui/material";
import { Control, useController } from "react-hook-form";

interface ISelectProps extends SelectProps {
  name: string;
  options: {
    label: string;
    value: any;
  }[];
  control: Control<any>;
}
export function Select({ options = [], name, control, ...rest }: ISelectProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({ name, control });
  return (
    <MaterialSelect
      name={name}
      value={rest.multiple ? (Array.isArray(value) ? value : []) : value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid}
      variant={rest.variant ?? "outlined"}
      fullWidth={rest.fullWidth ?? true}
      inputRef={ref}
      {...rest}
    >
      {options.map((o) => (
        <MenuItem value={o.value}>{o.label}</MenuItem>
      ))}
    </MaterialSelect>
  );
}
