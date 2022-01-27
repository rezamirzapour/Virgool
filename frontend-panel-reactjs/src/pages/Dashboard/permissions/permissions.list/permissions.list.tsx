import { useNavigate } from "react-router-dom";
import {
  Edit as EditIcon,
  Add as AddIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";
import { PermissionsServices } from "services";
import type { PermissionsResponse } from "types";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable";
import { Page } from "components";
import { Button } from "components/material";
import { useDeletePermissionMutation } from "hooks";
import { initialFilterOptions, columns } from "./items";

export default function PermissionsList() {
  const { register, refetch } = useAwesomeTable<PermissionsResponse>({
    fetcherCallback: PermissionsServices.findAll,
    filterOptions: initialFilterOptions(),
  });
  const { mutate: deletePermission, isLoading: isSubmitting } =
    useDeletePermissionMutation();
  const onDelete = async (rd: any) => {
    await deletePermission(rd.id);
    refetch();
  };
  const navigate = useNavigate();
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
      title="لیست دسترسی ها"
      meta={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          افزودن دسترسی
        </Button>
      }
    >
      <AwesomeTable columns={columns} register={register} actions={actions} />
    </Page>
  );
}
