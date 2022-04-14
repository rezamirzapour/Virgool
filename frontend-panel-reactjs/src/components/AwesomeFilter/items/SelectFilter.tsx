import { Select, MenuItem, SelectProps } from "@mui/material";

interface IProps {
  selectProps?: SelectProps;
  options?: { label: string; value: any }[];
}

export default function SelectFilter({ selectProps, options }: IProps) {
  return (
    <Select fullWidth variant="outlined" {...selectProps}>
      {options?.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
}
