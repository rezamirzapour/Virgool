import { ChangeEvent } from "react";
import { Checkbox, FormLabel, Grid, Typography } from "@mui/material";

interface IProps {
  label: string;
  options: {
    label: string;
    value: any;
  }[];
  checkedValues?: any[];
  onToggleBox: (ev: ChangeEvent<HTMLInputElement>) => void;
}
export function CheckBoxGroup({
  label,
  options,
  checkedValues = [],
  onToggleBox,
}: IProps) {
  return (
    <>
      <Typography>{label}</Typography>
      <Grid container>
        {options.map((o) => (
          <Grid key={o.value} item lg={4} xs={12} alignItems="center">
            <Checkbox
              color="primary"
              value={o.value}
              checked={checkedValues.includes(o.value)}
              onChange={onToggleBox}
            />
            <FormLabel
              sx={{ cursor: "pointer" }}
              htmlFor={`checkbox-${o.label}-${o.value}`}
            >
              {o.label}
            </FormLabel>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
