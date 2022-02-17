import { IColumn } from "components/AwesomeTable/items/interface";
import type { UsersResult } from "types";
import { colors, Avatar, Box } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { parseDate } from "utils";

const columns: IColumn<UsersResult>[] = [
  {
    title: "شناسه",
    field: "id",
  },
  {
    title: "نام",
    field: "firstName",
  },
  {
    title: " نام خانوادگی",
    field: "lastName",
  },
  {
    title: " ایمیل",
    field: "email",
  },
  {
    title: " شماره موبایل",
    render: (rd) => rd.phoneNumber ?? "-",
  },
  {
    title: "تاییدیه ایمیل",
    render: (rd) =>
      rd.isEmailVerified ? (
        <CheckIcon sx={{ color: colors.green[500] }} />
      ) : (
        <CloseIcon sx={{ color: colors.red[500] }} />
      ),
  },
  {
    title: "تاییدیه موبایل",
    render: (rd) =>
      rd.isPhoneNumberVerified ? (
        <CheckIcon sx={{ color: colors.green[500] }} />
      ) : (
        <CloseIcon sx={{ color: colors.red[500] }} />
      ),
  },
  {
    title: "نصویر شاخص",
    render: (rd) => (
      <Box display="flex" justifyContent="center">
        <Avatar src={rd.avatar?.fullPath ?? ""} alt={rd.firstName}>
          {rd.firstName[0]}
        </Avatar>
      </Box>
    ),
  },
  {
    title: "تاریخ ایجاد",
    render: (rd) => parseDate(rd.createdAt),
  },
  {
    title: "آخرین ویرایش",
    render: (rd) => parseDate(rd.updatedAt),
  },
];

export default columns;
