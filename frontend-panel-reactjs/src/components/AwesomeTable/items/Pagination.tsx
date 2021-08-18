import { Box } from '@material-ui/core';
import { Pagination as MaterialPagination } from '@material-ui/lab';

interface IProps {
    setSize: (size: number) => void,
    setPage: (page: number) => void,
    totalCount: number,
    page: number,
    size: number
}

export function Pagination({ page, setPage }: IProps) {
    return <Box display="flex" justifyContent="center" color="primary">
        <MaterialPagination
            page={page}
            onChange={(_, pageNumber: number) => setPage(pageNumber)}
            color="primary"
            shape="rounded"
        />
    </Box>
}