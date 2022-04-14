import { Button } from "@mui/material";
import {
  Edit as EditIcon,
  Add as AddIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";
import { ArticleServices } from "services";
import type { ArticlesResponse } from "types";
import {
  AwesomeTable,
  useAwesomeTable,
  IAction,
} from "components/AwesomeTable";
import { Page } from "components";
import { useDeleteArticleMutation } from "hooks";
import { initialFilterOptions, columns } from "./items";
import { useNavigate } from "react-router-dom";

export default function ArticleList() {
  const { mutate: deleteArticle, isLoading: isSubmitting } =
    useDeleteArticleMutation();

  const onDelete = async (rd: any) => {
    await deleteArticle(+rd.id);
    refetch();
  };

  const actions: IAction[] = [
    {
      icon: <EditIcon color="primary" />,
      onClick: (rd: any) => navigate(`${rd.id}/edit`),
      tooltip: "ویرایش",
    },
    {
      icon: <DeleteIcon color="secondary" />,
      onClick: onDelete,
      tooltip: "حذف",
      loading: isSubmitting,
    },
  ];

  const { register, refetch } = useAwesomeTable<ArticlesResponse>({
    fetcherCallback: ArticleServices.findAll,
    filterOptions: initialFilterOptions(),
    columns,
    actions,
  });

  const navigate = useNavigate();

  return (
    <Page
      title="لیست مقالات"
      returnTo="articles.list"
      meta={
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          افزودن مقاله
        </Button>
      }
    >
      <AwesomeTable register={register} />
    </Page>
  );
}
