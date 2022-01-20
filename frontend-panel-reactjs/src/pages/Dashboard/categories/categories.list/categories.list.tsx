import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import {
  Edit as EditIcon,
  Add as AddIcon,
  DeleteForever as DeleteIcon,
} from "@material-ui/icons";
import { CategoriesServices } from "services";
import type { CategoriesResponse } from "types";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable";
import { AwesomeFilter, useAwesomeFilter } from "components/AwesomeFilter";
import { Page } from "components";
import { Button } from "components/material";
import { useMutate } from "hooks";
import { initialFilterOptions, columns } from "./items";
import { useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const { fetchData, loading, pagination, response, setPage, setSize } =
    useAwesomeTable<CategoriesResponse>();
  const { getValues, register } = useAwesomeFilter(initialFilterOptions());
  const navigate = useNavigate();
  const { mutate, isSubmitting } = useMutate();

  const onApplyFiler = () =>
    fetchData(() =>
      CategoriesServices.findAll({
        offset: pagination.offset,
        size: pagination.size,
        ...getValues(),
      })
    );

  const onDelete = async (rd: any) => {
    await mutate(() => CategoriesServices.remove(rd.id));
    onApplyFiler();
  };

  useEffect(() => {
    onApplyFiler();
  }, [pagination]);

  return (
    <Page
      title="لیست دسته ها"
      meta={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("categories.create")}
        >
          افزودن دسته بندی
        </Button>
      }
    >
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
            onClick: (rd) => navigate(`categories/${rd.id}/edit`),
            tooltip: "ویرایش",
          },
          {
            icon: <DeleteIcon color="secondary" />,
            onClick: onDelete,
            tooltip: "حذف",
            loading: isSubmitting,
          },
        ]}
      />
    </Page>
  );
}
