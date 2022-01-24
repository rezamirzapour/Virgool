import { useState } from "react";
import { useTheme } from "@material-ui/core";
import {
  Edit as EditIcon,
  Add as AddIcon,
  DeleteForever as DeleteIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@material-ui/icons";
import { RolesServices } from "services";
import type { RolesResponse } from "types";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable2";
import { Page } from "components";
import { useDeleteRoleMutation } from "hooks";
import { initialFilterOptions, columns } from "./items";
import { Button } from "components/material";
import { useNavigate } from "react-router-dom";

export default function RolesList() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { register, refetch } = useAwesomeTable<RolesResponse>({
    fetcherCallback: RolesServices.findAll,
    filterOptions: initialFilterOptions(),
  });
  const navigate = useNavigate();
  const [deleteRole, { isLoading: isSubmitting }] = useDeleteRoleMutation();

  const theme = useTheme();

  const onDelete = async (rd: any) => {
    await deleteRole(+rd.id);
    refetch();
  };

  const actions = [
    {
      icon: <EditIcon color="primary" />,
      onClick: (rd: any) => navigate(`roles/${rd.id}/edit`),
      tooltip: "ویرایش",
    },
    {
      icon: <DeleteIcon color="secondary" />,
      onClick: onDelete,
      tooltip: "حذف",
      loading: isSubmitting,
    },
    {
      icon: <VerifiedUserIcon style={{ color: theme.palette.success.main }} />,
      onClick: (rd: any) => setIsOpenDialog(true),
      tooltip: "مشاهده دسترسی ها",
    },
  ];

  return (
    <Page
      title="لیست نقش ها"
      meta={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          افزودن نقش
        </Button>
      }
    >
      <AwesomeTable columns={columns} register={register} actions={actions} />
    </Page>
  );
}
