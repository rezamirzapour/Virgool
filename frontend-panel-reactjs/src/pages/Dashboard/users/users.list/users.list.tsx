import { Edit as EditIcon } from "@mui/icons-material";
import { UsersServices } from "services";
import { AwesomeTable, useAwesomeTable } from "components/AwesomeTable";
import { Page } from "components";
import { initialFilterOptions, columns } from "./items";
import { useNavigate } from "react-router-dom";
import type { UsersResponse } from "types";

export default function UsersList() {
  const { register } = useAwesomeTable<UsersResponse>({
    fetcherCallback: UsersServices.findAll,
    filterOptions: initialFilterOptions(),
  });
  const navigate = useNavigate();
  const actions = [
    {
      icon: <EditIcon color="primary" />,
      onClick: (rd: any) => navigate(`${rd.id}/edit`),
      tooltip: "ویرایش",
    },
  ];
  return (
    <Page title="لیست کاربران">
      <AwesomeTable columns={columns} register={register} actions={actions} />
    </Page>
  );
}
