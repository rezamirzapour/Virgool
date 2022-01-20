import { useCreateCategoryMutation } from "hooks";
import { Page } from "components";
import { Grid } from "@material-ui/core";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import { createCategorySchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CategoriesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createCategorySchema),
  });
  const [onSubmit, { isLoading: isSubmitting }] = useCreateCategoryMutation();

  return (
    <Page title="ایجاد دسته بندی">
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
              ایجاد دسته بندی
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
}
