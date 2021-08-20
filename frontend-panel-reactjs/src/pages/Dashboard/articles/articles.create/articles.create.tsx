import { TextField, Select, Button } from 'components/material';
import { TextEditor, useTextEditor } from 'components/TextEditor';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { CreateArticleDto, ArticleServices } from 'services';
import { useEntity, useMutate, useRouter } from 'hooks';
import { useForm } from 'react-hook-form';
import { ValidationRule } from 'types';

const defaultValues: CreateArticleDto = {
    content: '',
    title: '',
    categories: [],
    thumbnailId: null
}

const RULES: ValidationRule<CreateArticleDto> = {
    title: {
        required: 'عنوان اجباری می‌باشد',
        maxLength: 128
    },
}

export default function ArticlesCreate() {
    const methods = useForm({ defaultValues });
    const categories = useEntity("categories")
    const { mutate, isSubmitting } = useMutate()
    const { editorState, getHtmlContent, setEditorState } = useTextEditor()
    const { navigate } = useRouter()
    const onSubmit = (data: CreateArticleDto) => {
        const requestBody: CreateArticleDto = {
            ...data,
            content: getHtmlContent()
        }
        return mutate(() => ArticleServices.create(requestBody))
    }
    return <Page title="ایجاد مقاله" >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container>
                <Grid lg={6} spacing={3} item container>
                    <Grid item lg={12}>
                        <TextField
                            name="title"
                            label="عنوان"
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
                            defaultValue={defaultValues.categories}
                            multiple
                            title="categories"
                            placeholder="دسته بندی"
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