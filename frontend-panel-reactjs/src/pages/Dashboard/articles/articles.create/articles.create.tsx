import { TextField, Select } from 'components/material';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { CreateArticleDto } from 'services/articles';
import { useEntity } from 'hooks';
import { useForm } from 'react-hook-form';

const defaultValues: CreateArticleDto = {
    content: '',
    title: '',
    categories: [],
    thumbnailId: null
}

export default function ArticlesCreate() {
    const methods = useForm({ defaultValues });
    const categories = useEntity("categories")
    return <Page title="ایجاد مقاله" >
        <form>
            <Grid container>
                <Grid lg={6} spacing={3} item container>
                    <Grid item lg={12}>
                        <TextField name="title" label="عنوان" methods={methods} />
                    </Grid>
                    <Grid item lg={12}>
                        <Select
                            options={categories.map((c: any) => ({ label: c.title, value: c.id }))}
                            defaultValue={defaultValues.categories}
                            multiple
                            title="categories"
                            placeholder="دسته بندی"
                            name="categories"
                            label="دسته بندی"
                        />
                    </Grid>

                    <Grid item lg={12}>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    </Page>
}