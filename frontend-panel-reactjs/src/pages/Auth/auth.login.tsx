import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Link, Typography, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useRouter, useGetCategoriesQuery } from "hooks";
import type { LoginDto } from "types";
import { Button } from "components/material";
import { loginSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "material-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState(true);
  const onSubmit = (data: LoginDto) => {
    dispatch({ type: "LOGIN_SAGA", payload: { data, history: navigate } });
  };
  const { data: theCategories, error } = useGetCategoriesQuery({ paginate });
  useEffect(() => {
    setTimeout(() => setPaginate(false), 6000);
  }, [theCategories]);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("dashboard");
    }
  }, [auth.access_token]);

  return (
    <>
      <Typography component="h1" variant="h5">
        ورود
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          label="ایمیل"
          name="email"
          control={control}
        />
        <TextField
          margin="normal"
          name="password"
          label="رمز عبور"
          type="password"
          control={control}
        />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          type="submit"
          loading={auth.loginLoading}
        >
          ورود
        </Button>
        <Grid container style={{ marginTop: "1em" }}>
          <Grid item xs>
            <Link href="#" variant="body2">
              رمز عبورم را فراموشی کرده ام
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => navigate("auth.register")}
              style={{ cursor: "pointer" }}
              variant="body2"
            >
              {"در حال حاضر حسابی ندارید؟ ثبت نام کنید"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
