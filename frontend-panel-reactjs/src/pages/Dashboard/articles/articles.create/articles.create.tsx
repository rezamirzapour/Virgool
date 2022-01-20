import type { CreateArticleDto } from "types";
import { Button } from "components/material";
import { TextField, SelectField, RadioGroupField } from "material-hook-form";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page } from "components";
import { Grid } from "@material-ui/core";
import {
  useRouter,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "hooks";
import { useForm } from "react-hook-form";
import { createArticleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ArticlesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createArticleSchema),
  });
  const { data: categories } = useGetCategoriesQuery({});
  const [createCategory, { isLoading: isSubmitting }] =
    useCreateCategoryMutation();
  const { editorState, getHtmlContent, setEditorState } = useTextEditor();
  const { navigate } = useRouter();
  const onSubmit = (data: CreateArticleDto) => {
    const requestBody: CreateArticleDto = {
      ...data,
      content: getHtmlContent(),
    };
    createCategory(requestBody);
  };
  return (
    <Page title="ایجاد مقاله">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid lg={6} spacing={3} item container>
            <Grid item lg={12}>
              <TextField name="title" label="عنوان" control={control} />
            </Grid>
            <Grid item lg={12}>
              <TextEditor
                label="محتوا"
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
            <Grid item lg={12}>
              <SelectField
                options={
                  categories?.map?.((c: any) => ({
                    label: c.title,
                    value: c.id,
                  })) ?? []
                }
                multiple
                name="categories"
                label="دسته بندی"
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <RadioGroupField
              options={[
                {
                  label: "منتشر شود",
                  value: "publsihed",
                },
                {
                  label: "بعنوان پیش‌نویس ذخیره شود",
                  value: "unpublsihed",
                },
              ]}
              name="status"
              label="وضعیت انتشار"
              control={control}
            />
          </Grid>
          <Grid item lg={12}>
            <Button
              variant="contained"
              color="primary"
              loading={isSubmitting}
              type="submit"
            >
              ثبت
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("articles.list")}
              style={{ marginRight: ".25em" }}
            >
              انصراف
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
}
