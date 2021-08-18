import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TextField, Select } from 'components/material';
import { Page } from 'components';
import { ArticleServices, ArticleResponse } from 'services/articles';
import { useEntity, useFetchDetails } from 'hooks';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'

export default function ArticlesEdit() {
    const { id } = useParams<{ id: string | undefined }>()
    const { fetchData: fetchArticle, loading: loadingArticle, response: articleResponse } = useFetchDetails<ArticleResponse>();
    const methods = useForm();
    const categories = useEntity("categories")
    useEffect(() => {
        fetchArticle(() => ArticleServices.findOne(Number(id)))
    }, [])

    return <Page loading={loadingArticle} title="ویرایش مقاله">
        <form>
            <Grid container>
                <Grid lg={6} spacing={3} item container>
                    <Grid item lg={12}>
                        <TextField
                            name="title"
                            label="عنوان"
                            defaultValue={articleResponse?.result?.title}
                            methods={methods} />
                    </Grid>
                    <Grid item lg={12}>
                        <Select
                            options={categories.map((c: any) => ({ label: c.title, value: c.id }))}
                            defaultValue={[]}
                            name="categories"
                            label="دسته بندی"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    </Page>
}