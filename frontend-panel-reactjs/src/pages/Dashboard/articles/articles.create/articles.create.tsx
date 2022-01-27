import { useNavigate } from "react-router-dom";
import type { CreateArticleDto } from "types";
import { Button } from "components/material";
import {
  TextField,
  Select as SelectField,
  RadioGroupField,
} from "components/material";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page } from "components";
import { Grid, Stack } from "@mui/material";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "hooks";
import { useForm } from "react-hook-form";
import { createArticleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ArticlesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createArticleSchema),
  });
  const { data: categories } = useGetCategoriesQuery();
  const { mutate: createCategory, isLoading: isSubmitting } =
    useCreateCategoryMutation();
  const { editorState, getHtmlContent, setEditorState } = useTextEditor();
  const navigate = useNavigate();
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
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <TextEditor
            label="محتوا"
            editorState={editorState}
            setEditorState={setEditorState}
          />
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
              sx={{ marginLeft: ".25em" }}
            >
              انصراف
            </Button>
          </Grid>
        </Stack>
      </form>
    </Page>
  );
}
