import type { FC } from "react";
import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

interface IProps extends StandardTextFieldProps {
  name: string;
}

const TextField: FC<IProps> = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { ref, ...registerObj } = register(name);
  return (
    <MaterialTextField
      {...props}
      {...registerObj}
      inputRef={ref}
      error={Boolean(errors[name])}
      helperText={errors[name]}
    />
  );
};

export default TextField;
