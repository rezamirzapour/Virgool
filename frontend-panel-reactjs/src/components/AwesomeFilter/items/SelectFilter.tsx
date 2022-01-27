import { Select, ListItem, SelectProps } from "@mui/material";

interface IProps {
  selectProps?: SelectProps;
  options?: { label: string; value: any }[];
}

export default function SelectFilter({ selectProps, options }: IProps) {
  return (
    <Select fullWidth variant="outlined" {...selectProps}>
      {options?.map((o) => (
        <ListItem value={o.value}>{o.label}</ListItem>
      ))}
    </Select>
  );
}
