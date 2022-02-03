import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm, FormProvider } from "react-hook-form";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { LoadingButton } from "@mui/lab";
// material
import {
  Link,
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { loginSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./TextField";
import { useLoginMutation } from "hooks";
import type { LoginDto } from "types";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const { mutate, isLoading } = useLoginMutation();
  const onSubmit = async (dataForm: LoginDto) => {
    mutate(dataForm);
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <TextField name="email" fullWidth type="email" label="آدرس ایمیل" />

          <TextField
            name="password"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="رمز عبور"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={false}
            helperText={"touched.password && errors.password"}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="مرا بخاطر بسپار"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            فراموشی رمز عبور
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          ورود
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
