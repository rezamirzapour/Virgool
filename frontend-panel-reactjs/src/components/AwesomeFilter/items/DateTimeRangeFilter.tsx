import { Grid } from "@mui/material";
import { useState } from "react";
import { DateTimeRangeValue } from "./interface";
import { useEffect } from "react";

interface IProps {
  onChange: (value: DateTimeRangeValue) => void;
  value: DateTimeRangeValue;
}

export default function DateTimeRangeFilter({ onChange, value }: IProps) {
  const [state, setState] = useState<DateTimeRangeValue>(value);

  useEffect(() => {
    if (state.start !== null && state !== null) onChange(state);
  }, [state]);

  return (
    <Grid container spacing={3}>
      <Grid lg={6} item></Grid>
    </Grid>
  );
}
