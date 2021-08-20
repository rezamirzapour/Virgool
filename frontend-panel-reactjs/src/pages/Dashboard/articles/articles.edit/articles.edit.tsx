import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TextField, Select, Button } from 'components/material';
import { TextEditor, useTextEditor } from 'components/TextEditor';
import { Page } from 'components';
import { ArticleServices, ArticleResponse, UpdateArticleDto } from 'services';
import { useEntity, useFetchDetails, useMutate, useRouter } from 'hooks';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { ValidationRule } from 'types';

const RULES: ValidationRule<UpdateArticleDto> = {
    title: {
        required: 'عنوان اجباری می‌باشد',
        maxLength: 128
    },
}

export default function ArticlesEdit() {
    const { id } = useParams<{ id: string | undefined }>()
    const { fetchData: fetchArticle, loading: loadingArticle, response: articleResponse } = useFetchDetails<ArticleResponse>();
    const methods = useForm();
    const categories = useEntity("categories")
    const { editorState, getHtmlContent, setEditorState } = useTextEditor(articleResponse?.result?.content ?? "")
    const { mutate, isSubmitting } = useMutate()
    const { navigate } = useRouter()

    useEffect(() => {
        id && fetchArticle(() => ArticleServices.findOne(+id))
    }, [])

    useEffect(() => {
        methods.setValue('title', articleResponse?.result?.title ?? '')
        methods.setValue('categories', articleResponse?.result?.categories?.map?.(c => c.id) ?? [])
    }, [articleResponse])

    const onSubmit = (data: UpdateArticleDto) => {
        const requestBody: UpdateArticleDto = {
            ...data,
            content: getHtmlContent()
        }
        id && mutate(() => ArticleServices.update(+id, requestBody))
    }

    return <Page loading={loadingArticle} title="ویرایش مقاله">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container>
                <Grid lg={6} spacing={3} item container>
                    <Grid item lg={12}>
                        <TextField
                            name="title"
                            label="عنوان"
                            defaultValue={articleResponse?.result?.title}
                            methods={methods}
                            rules={RULES.title}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextEditor label="محتوا" editorState={editorState} setEditorState={setEditorState} />
                    </Grid>
                    <Grid item lg={12}>
                        <Select
                            options={categories.map((c: any) => ({ label: c.title, value: c.id }))}
                            name="categories"
                            label="دسته بندی"
                            methods={methods}
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
                            onClick={() => navigate('articles.list')}
                            style={{ marginRight: '.25em' }}
                        >
                            انصراف
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    </Page>
}