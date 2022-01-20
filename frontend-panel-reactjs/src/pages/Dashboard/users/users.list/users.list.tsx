import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { UsersServices } from "services";
import type { UsersResponse } from "types";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable";
import { AwesomeFilter, useAwesomeFilter } from "components/AwesomeFilter";
import { Page } from "components";
import { useRouter } from "hooks";
import { initialFilterOptions, columns } from "./items";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const { fetchData, loading, pagination, response, setPage, setSize } =
    useAwesomeTable<UsersResponse>();
  const { getValues, register } = useAwesomeFilter(initialFilterOptions());
  const navigate = useNavigate();
  const onApplyFiler = () =>
    fetchData(() =>
      UsersServices.findAll({
        offset: pagination.offset,
        size: pagination.size,
        ...getValues(),
      })
    );

  useEffect(() => {
    onApplyFiler();
  }, [pagination]);

  return (
    <Page title="لیست کاربران">
      <Grid spacing={3} container alignItems="center">
        <Grid lg={6} item>
          <AwesomeFilter onApplyFilter={onApplyFiler} register={register} />
        </Grid>
      </Grid>
      <AwesomeTable
        columns={columns}
        loading={loading}
        page={pagination.page}
        query={{ data: response.result, totalCount: response.count }}
        setPage={setPage}
        setSize={setSize}
        size={pagination.size}
        actions={[
          {
            icon: <EditIcon color="primary" />,
            onClick: (rd) => navigate(`users/${rd.id}/edit`),
            tooltip: "ویرایش",
          },
        ]}
      />
    </Page>
  );
}
