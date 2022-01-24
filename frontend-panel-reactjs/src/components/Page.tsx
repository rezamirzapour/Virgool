import type { FC } from "react";
import Helmet from "react-helmet";
import { Paper, Box } from "@material-ui/core";
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";
import { Loading } from ".";
import { Button } from "components/material";
import { useNavigate } from "react-router-dom";

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
    <>
      <Helmet>
        <title>ویرگول::{title}</title>
      </Helmet>
      <Paper style={{ height: "100%" }}>
        <Box p={"3rem"}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <h1>{title}</h1>
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
          <Box display={"flex"} height={"100%"}>
            {children}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Page;
