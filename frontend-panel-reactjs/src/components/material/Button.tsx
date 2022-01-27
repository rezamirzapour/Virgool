import { Button as MaterialButton, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loading from "./Loading";
import clsx from "clsx";

interface IButtonProps extends ButtonProps {
  loading?: boolean;
}

export function Button({ loading, ...rest }: IButtonProps) {
  return (
    <MaterialButton
      disabled={loading ? true : rest.disabled}
      endIcon={loading ? <Loading size={20} /> : rest.endIcon}
      {...rest}
    />
  );
}
export function SuccessButton(props: IButtonProps) {
  const classes = useStyles();
  return (
    <Button
      {...props}
      variant="contained"
      className={clsx(classes.success, props.className)}
    />
  );
}

export function CancelButton(props: IButtonProps) {
  return <Button variant="contained" color="secondary" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  success: {
    color: "white",
  },
}));
