import {
  Edit as EditIcon,
  Add as AddIcon,
  DeleteForever as DeleteIcon,
} from "@material-ui/icons";
import { CategoriesServices } from "services";
import type { CategoriesResponse } from "types";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable2";
import { Page } from "components";
import { Button } from "components/material";
import { initialFilterOptions, columns } from "./items";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "hooks";

export default function CategoriesList() {
  const { register, refetch } = useAwesomeTable<CategoriesResponse>({
    fetcherCallback: CategoriesServices.findAll,
    filterOptions: initialFilterOptions(),
  });
  const navigate = useNavigate();
  const [deleteCategory, { isLoading: isSubmitting }] =
    useDeleteCategoryMutation();

  const onDelete = async (rd: any) => {
    await deleteCategory(+rd.id);
    refetch();
  };

  const actions = [
    {
      icon: <EditIcon color="primary" />,
      onClick: (rd: any) => navigate(`${rd.id}/edit`),
      tooltip: "ویرایش",
    },
    {
      icon: <DeleteIcon color="secondary" />,
      onClick: onDelete,
      tooltip: "حذف",
      loading: isSubmitting,
    },
  ];

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
      <AwesomeTable columns={columns} register={register} actions={actions} />
    </Page>
  );
}
