import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Link, Typography, makeStyles } from "@material-ui/core";
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import { useRouter } from 'hooks';
import { LoginDto } from "services";
import { TextField, Button } from "components/material";
import { ValidationRule } from 'types';

const defaultValues: LoginDto = {
  email: "",
  password: ""
}

const RULES: ValidationRule<LoginDto> = {
  email: {
    required: "ایمیل اجباری می‌باشد"
  },
  password: {
    required: "رمز عبور اجباری می‌باشد",
    minLength: { value: 8, message: 'طول رمز عبور حداقل ۸ باید باشد' }
  }
}

export default function Login() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const methods = useForm({ defaultValues })
  const { navigate } = useRouter();
  const auth = useSelector((state: any) => state.auth)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const onSubmit = (data: LoginDto) => {
    dispatch({ type: "LOGIN_SAGA", payload: { data, enqueueSnackbar, history } })
  }

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
      <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          label="ایمیل"
          name="email"
          methods={methods}
          rules={RULES.email}
        />
        <TextField
          margin="normal"
          name="password"
          label="رمز عبور"
          type="password"
          methods={methods}
          rules={RULES.password}
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
