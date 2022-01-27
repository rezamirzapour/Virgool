import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useState } from "react";
interface IDatePicker {
  name?: string;
  label: string;
  methods: any;
}
export default function CutomDatePicker({ name, label, methods }: IDatePicker) {
  const [value, setValue] = useState<number | null>(null);
  const classes = useStyles();
  return (
    <div>
      <p style={{ marginBottom: "5px" }}>{label}</p>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  // root: {
  //     width: '100%',
  //     'MuiInput-underline': {
  //         borderBottom: 0,
  //         '&:after': {
  //             borderBottom: 0
  //         },
  //         '&:before': {
  //             borderBottom: 0
  //         }
  //     },
  //     '& .MuiInput-input': {
  //         border: '1px solid #e8eaed',
  //         padding: '.5rem',
  //         borderRadius: '5px'
  //     }
  // }
}));
