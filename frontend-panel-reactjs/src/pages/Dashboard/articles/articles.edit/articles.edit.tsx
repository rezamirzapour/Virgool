import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UpdateArticleDto } from "types";
import { Grid, Stack } from "@mui/material";
import { TextField, Select, Button } from "components/material";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page } from "components";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
  useGetCategoriesQuery,
} from "hooks";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateArticleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ArticlesEdit() {
  const { id } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const { data: article, isLoading: loadingArticle } = useGetArticleQuery(
    id ? +id : -1
  );
  const { isLoading: isSubmitting, mutate: updateArticle } =
    useUpdateArticleMutation(id ? +id : -1);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(updateArticleSchema),
  });

  const { editorState, getHtmlContent, setEditorState } = useTextEditor(
    article?.content ?? ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    setValue("title", article?.title ?? "");
    setValue("categories", article?.categories?.map?.((c: any) => c.id) ?? []);
  }, [article]);

  const onSubmit = (data: UpdateArticleDto) => {
    const requestBody: UpdateArticleDto = {
      ...data,
      content: getHtmlContent(),
    };
    id && updateArticle(requestBody);
  };
  return (
    <Page loading={loadingArticle} title="ویرایش مقاله" container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            name="title"
            label="عنوان"
            defaultValue={article?.title ?? ""}
            control={control}
          />

          <TextEditor
            label="محتوا"
            editorState={editorState}
            setEditorState={setEditorState}
          />

          <Select
            options={
              categories?.map?.((c: any) => ({
                label: c.title,
                value: c.id,
              })) ?? []
            }
            name="categories"
            label="دسته بندی"
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
