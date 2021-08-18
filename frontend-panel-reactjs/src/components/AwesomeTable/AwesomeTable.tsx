import { ReactNode } from 'react';
import {
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    makeStyles,
    Button,
    Paper
} from '@material-ui/core';
import {
    ActionTooltip,
    Pagination,
    Loading,
    Empty,
    isHidden,
    isDisabled,
    getIcon,
    getOnClickFunction,
    getTooltipTitle,
    getSortIcon
} from './items';
import { IColumn, ISortValue, AwesomeTableProps } from './items/interface';


export function AwesomeTable({
    loading = true,
    query = {
        data: [],
        totalCount: 0
    },
    columns = [],
    actions = [],
    setSize,
    page,
    setPage,
    size,
    sorts = [],
}: AwesomeTableProps) {
    const classes = useStyles();
    const handleSort = (column: IColumn, value: ISortValue) => {
        // setSorts?.((pre: any[]) =>
        //     pre.map((s: { key: any; }) =>
        //         s.key === column.field ? { key: column.field, value } : s
        //     )
        // );
    };
    return (
        <TableContainer>
            {loading
                ? <Paper><Loading /></Paper>
                : query?.data?.length === 0 ? <Paper><Empty /></Paper>
                    : <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {columns.map((c, i) => (
                                    <TableCell key={i} align="center">
                                        {c.title}
                                        {c.sorting && getSortIcon(sorts, c, handleSort, classes)}
                                    </TableCell>
                                ))}
                                {actions?.length > 0 && <TableCell align="center">عملیات</TableCell>}
                            </TableRow>
                        </TableHead>
                        {query.data?.length > 0 && (
                            <TableBody>
                                {query.data?.map?.((item, k) => (
                                    <TableRow key={k}>
                                        {columns.map((c, i) => (
                                            <TableCell align="center" key={i}>
                                                {c.render ? c.render?.(item) : item[c.field as string]}
                                            </TableCell>
                                        ))}
                                        <TableCell align="center" className={classes.actionButtonCell}>
                                            {actions.map((action, j) =>
                                                !isHidden(action, item) &&
                                                <ActionTooltip
                                                    key={j}
                                                    title={getTooltipTitle(action, item)}
                                                    arrow
                                                    placement="right">
                                                    <Button
                                                        className={classes.actionButton}
                                                        variant="contained"
                                                        disabled={isDisabled(action, item)}
                                                        onClick={() => getOnClickFunction(action, item)}>
                                                        {getIcon(action, item)}
                                                    </Button>
                                                </ActionTooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
            }

            <Pagination
                totalCount={query.totalCount}
                page={page}
                setPage={setPage}
                setSize={setSize}
                size={size}
            />

        </TableContainer>
    );
}

const useStyles = makeStyles(() => ({
    table: {
        borderCollapse: 'separate',
        borderSpacing: '0 4px',
        '& .MuiTableHead-root': {
            '& .MuiTableRow-root': {
                '& .MuiTableCell-head': {
                    border: 0,
                    color: '#6e7182',
                    fontSize: '14px'
                }
            }
        },
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                '& .MuiTableCell-root': {
                    backgroundColor: 'white',
                    border: 0,
                    paddingTop: '.75em',
                    paddingBottom: '.75em',
                    fontSize: '16px'
                }
            }
        }
    },
    actionButtonCell: {
        '& .MuiButton-root': {
            color: '#9093a0',
            maxWidth: '40px',
            maxHeight: '40px',
            height: '40px',
            padding: '0',
            border: '0',
            boxShadow: 'none',
            width: '40px',
            minWidth: '40px',
            minHeight: '40px'
        },
        '& .MuiButton-contained': {
            backgroundColor: '#f8f7f7'
        },
        '& .Mui-disabled': {}
    },
    actionButton: {
        marginRight: '.25em'
    },
    sortIcon: {
        transform: 'translateY(10px)',
        cursor: 'pointer'
    }
}));
