import { useEffect } from "react";
import { UpdateArticleDto } from "types";
import { Grid } from "@material-ui/core";
import { TextField, Select, Button } from "components/material";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page } from "components";
import {
  useRouter,
  useGetArticleQuery,
  useUpdateArticleMutation,
  useGetCategoriesQuery,
} from "hooks";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان نباید بیشتر از ۱۲۸ کاراکتر باشد"),
  content: yup.string(),
  categories: yup.array().of(yup.number()),
  thumbnailId: yup.number(),
});

export default function ArticlesEdit() {
  const { id } = useParams();
  const { data: categories } = useGetCategoriesQuery({});
  const { data: article, isLoading: loadingArticle } = useGetArticleQuery(
    id ? +id : -1
  );
  const [updateArticle, { isLoading: isSubmitting }] =
    useUpdateArticleMutation();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const { editorState, getHtmlContent, setEditorState } = useTextEditor(
    article?.content ?? ""
  );
  const { navigate } = useRouter();

  useEffect(() => {
    setValue("title", article?.title ?? "");
    setValue("categories", article?.categories?.map?.((c: any) => c.id) ?? []);
  }, [article]);

  const onSubmit = (data: UpdateArticleDto) => {
    const requestBody: UpdateArticleDto = {
      ...data,
      content: getHtmlContent(),
    };
    id && updateArticle({ id: +id, data: requestBody });
  };

  return (
    <Page loading={loadingArticle} title="ویرایش مقاله">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid lg={6} spacing={3} item container>
            <Grid item lg={12}>
              <TextField
                name="title"
                label="عنوان"
                defaultValue={article?.title ?? ""}
                control={control}
              />
            </Grid>
            <Grid item lg={12}>
              <TextEditor
                label="محتوا"
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
            <Grid item lg={12}>
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
        </Grid>
      </form>
    </Page>
  );
}
