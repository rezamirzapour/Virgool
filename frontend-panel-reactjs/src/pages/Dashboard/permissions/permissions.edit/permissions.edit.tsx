import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPermissionQuery, useUpdatePermissionMutation } from "hooks";
import { Page } from "components";
import { Stack } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import type { UpdatePermissionDto } from "types";
import { updatePermissoinSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PermissionsEdit() {
  const { id } = useParams();
  const { control, setValue, handleSubmit } = useForm<UpdatePermissionDto>({
    resolver: yupResolver(updatePermissoinSchema),
  });
  const { data: permission, isLoading } = useGetPermissionQuery(id ? +id : -1);
  const { mutate: updatePermission, isLoading: isSubmitting } =
    useUpdatePermissionMutation(id ? +id : -1);

  const onSubmit = (data: UpdatePermissionDto) => {
    id && updatePermission(data);
  };

  useEffect(() => {
    permission && setValue("title", permission.title);
  }, [permission, setValue]);

  return (
    <Page title="ویرایش دسترسی" loading={isLoading} container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ویرایش دسترسی
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
