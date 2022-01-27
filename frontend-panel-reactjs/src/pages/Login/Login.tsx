import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
import { MHidden, AuthSocial, Page, AuthLayout, LoginForm } from "./components";
export default function Login() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        حساب کاربری ندارید؟ &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          شروع کنید
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            خوش آمدید
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              ورود به پنل ادمین
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              اطلاعات حساب خود را وارد کنید.
            </Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              حساب کاربری ندارید؟?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                شروع کنید
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
