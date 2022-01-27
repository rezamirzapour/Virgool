import { useCreateCategoryMutation } from "hooks";
import { Page } from "components";
import { Grid } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import { createCategorySchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateCategoryDto } from "types";

export default function CategoriesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createCategorySchema),
  });
  const { mutate: onSubmit, isLoading: isSubmitting } =
    useCreateCategoryMutation();

  return (
    <Page title="ایجاد دسته بندی">
      <form
        onSubmit={handleSubmit((data: CreateCategoryDto) => onSubmit(data))}
      >
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
