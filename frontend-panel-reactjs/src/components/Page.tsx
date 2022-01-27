import type { FC } from "react";
import Helmet from "react-helmet";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { Loading } from ".";
import { Button } from "components/material";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
interface IProps {
  loading?: boolean;
  title?: string;
  description?: string;
  meta?: any;
  returnTo?: string;
}

const Page: FC<IProps> = ({
  children,
  loading,
  title,
  description,
  meta,
  returnTo,
}) => {
  const navigate = useNavigate();
  if (loading) return <Loading />;
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
            <Box display="flex">
              {meta}
              {returnTo && (
                <Button
                  endIcon={<ChevronLeftIcon />}
                  style={{ marginRight: ".5em" }}
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
};

export default Page;
