import { Box } from "@material-ui/core";
import { Pagination as MaterialPagination } from "@material-ui/lab";

interface IProps {
  onSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  totalCount: number;
  page: number;
  size: number;
}

export function Pagination({ page, onPageChange }: IProps) {
  return (
    <Box display="flex" justifyContent="center" color="primary">
      <MaterialPagination
        page={page}
        onChange={(_, pageNumber: number) => onPageChange(pageNumber)}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}
