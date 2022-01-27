import type { FC } from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { Loading } from ".";
import { Button } from "components/material";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Container } from "@mui/material";
import { isAuthenticated } from "utils";

interface IProps {
  loading?: boolean;
  title?: string;
  description?: string;
  meta?: any;
  returnTo?: string;
  container?: boolean;
}

const Page: FC<IProps> = ({
  children,
  loading,
  title,
  description,
  meta,
  returnTo,
  container,
}) => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (loading) return <Loading />;
  function render() {
    return (
      <Box>
        <Helmet>
          <title>ویرگول::{title}</title>
        </Helmet>
        <Paper>
          <Box p={"3rem"}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography component={"h1"}>{title}</Typography>
                <span>{description}</span>
              </Box>
              <Box mt={"4rem"} display="flex">
                {meta}
                {returnTo && (
                  <Button
                    endIcon={<ChevronLeftIcon />}
                    sx={{ marginLeft: ".5em" }}
                    color="secondary"
                    variant="contained"
                    // onClick={() => navigate(returnTo)}
                    onClick={() => navigate("auth/login")}
                  >
                    بازگشت
                  </Button>
                )}
              </Box>
            </Box>
            <Box display={"flex"} sx={{ width: "100%" }} height={"100%"}>
              {children}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
  if (container) return <Container>{render()}</Container>;
  return render();
};

export default Page;
