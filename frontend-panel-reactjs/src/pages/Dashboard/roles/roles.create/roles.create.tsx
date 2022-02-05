import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { Page } from "components";
import { Button, CheckBoxGroup, TextField } from "components/material";
import { useCreateRoleMutation, useGetPermissionsQuery } from "hooks";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import type { CreateRoleDto } from "types";
import { createRoleSchema } from "validations";

export default function RolesCreate() {
  const { control, handleSubmit } = useForm<CreateRoleDto>({
    resolver: yupResolver(createRoleSchema),
  });
  const { data: permissions } = useGetPermissionsQuery();
  const { mutate: createRole, isLoading: isSubmitting } =
    useCreateRoleMutation();
  const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>(
    []
  );

  const onSubmit = (data: CreateRoleDto) => {
    const requestBody = {
      ...data,
      permissions: selectedPermissions,
    };
    return createRole(requestBody);
  };

  const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setSelectedPermissions((pre) =>
      pre.includes(+value) ? pre.filter((p) => p !== +value) : [...pre, +value]
    );
  };

  return (
    <Page title="ایجاد نقش" container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <TextField name="label" label="برچسب" control={control} />
          <CheckBoxGroup
            label="دسترسی ها"
            options={
              permissions?.map?.((p: any) => ({
                label: p.title,
                value: p.id,
              })) ?? []
            }
            onToggleBox={onToggleBox}
            checkedValues={selectedPermissions}
          />

          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ایجاد تقش
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
