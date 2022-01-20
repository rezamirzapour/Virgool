import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPermissionQuery, useUpdatePermissionMutation } from "hooks";
import { Page } from "components";
import { Grid } from "@material-ui/core";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import type { UpdatePermissionDto } from "types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
});

export default function PermissionsEdit() {
  const { id } = useParams();
  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: permission, isLoading } = useGetPermissionQuery(id ? +id : -1);
  const [updatePermission, { isLoading: isSubmitting }] =
    useUpdatePermissionMutation();

  const onSubmit = (data: UpdatePermissionDto) => {
    id && updatePermission({ id: +id, data });
  };

  useEffect(() => {
    permission && setValue("title", permission.title);
  }, [permission, setValue]);

  return (
    <Page title="ویرایش دسترسی" loading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField name="title" label="عنوان" control={control} />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              loading={isSubmitting}
              type="submit"
            >
              ویرایش دسترسی
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
}
