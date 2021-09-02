import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Link, Typography, makeStyles } from "@material-ui/core";
import { useForm } from 'react-hook-form'
import { useRouter, useGetCategoriesQuery } from 'hooks';
import { LoginDto } from "services";
import { Button } from "components/material";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'material-hook-form'
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("فرمت ایمیل معتبر نمی‌باشد")
    .required('ایمیل اجباری است'),
  password: yup
    .string()
    .min(8, 'طول رمز عبور حداقل ۸ می‌باشد')
    .required('رمز عبور اجباری است'),
});

export default function Login() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) })
  const { navigate } = useRouter();
  const auth = useSelector((state: any) => state.auth)
  const history = useHistory()
  const [paginate, setPaginate] = useState(true)
  const onSubmit = (data: LoginDto) => {
    dispatch({ type: "LOGIN_SAGA", payload: { data, history } })
  }
  const { data: theCategories, error } = useGetCategoriesQuery({ paginate })
  useEffect(() => { setTimeout(() => setPaginate(false), 6000) }, [theCategories])
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("dashboard")
    }
  }, [auth.access_token])

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
        <Grid container style={{ marginTop: '1em' }}>
          <Grid item xs>
            <Link href="#" variant="body2">
              رمز عبورم را فراموشی کرده ام
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => navigate("auth.register")} style={{ cursor: 'pointer' }} variant="body2">
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
