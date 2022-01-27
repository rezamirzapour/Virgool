import type { FC } from "react";
import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
  MenuItem,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

interface IOption {
  label: string;
  value: any;
}
interface IProps extends StandardTextFieldProps {
  name: string;
  options: IOption[];
}

const SelectField: FC<IProps> = ({ name, options, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { ref, ...registerObj } = register(name);
  return (
    <MaterialTextField
      {...props}
      {...registerObj}
      SelectProps={{ inputRef: ref }}
      error={Boolean(errors[name])}
      helperText={errors[name]}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MaterialTextField>
  );
};

export default SelectField;
