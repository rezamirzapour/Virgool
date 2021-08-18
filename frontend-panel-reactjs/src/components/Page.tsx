import Helmet from "react-helmet";
import { Paper, Box } from "@material-ui/core";
import { Loading } from ".";
import { useRouter } from 'hooks';
import { Button } from 'components/material'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';

interface IProps {
  loading?: boolean,
  title?: string,
  description?: string,
  meta?: any,
  children?: any,
  returnTo?: string
}

export default function Page({ children, loading, title, description, meta, returnTo }: IProps) {
  const { history } = useRouter()
  if (loading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>ویرگول::{title}</title>
      </Helmet>
      <Paper className="p-8">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3} >
          <div><h1>
            {title}
          </h1>
            <span>{description}</span>
          </div>
          <Box display="flex">
            {meta}
            {returnTo && <Button
              endIcon={<ChevronLeftIcon />}
              style={{ marginRight: '.5em' }}
              color="secondary"
              variant="contained"
              // onClick={() => navigate(returnTo)}
              onClick={() => history.goBack()}
            >بازگشت</Button>}
          </Box>
        </Box>
        <Box p={2}>{children}</Box>
      </Paper>
    </>
  );
}
