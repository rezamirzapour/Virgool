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
  children?: any;
  returnTo?: string;
}

export default function Page({
  children,
  loading,
  title,
  description,
  meta,
  returnTo,
}: IProps) {
  const navigate = useNavigate();
  if (loading) return <Loading />;
  return (
    <>
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
          <Box>{children}</Box>
        </Box>
      </Paper>
    </>
  );
}
