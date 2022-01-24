import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  Button,
  Paper,
  Grid,
} from "@material-ui/core";
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
  getSortIcon,
} from "./items";
import {
  IColumn,
  ISortValue,
  AwesomeTableProps,
  ISort,
} from "./items/interface";

import { AwesomeFilter } from "components/AwesomeFilter2";
export function AwesomeTable({
  register: {
    response,
    setResponse,
    loading,
    setLoading,
    pagination,
    onPageChange,
    onSizeChange,
    filterOptions,
    getValues,
    onDeleteFilter,
    onFilterChange,
    onApplyFilter,
  },
  columns = [],
  actions = [],
}: AwesomeTableProps) {
  const classes = useStyles();

  const renderLoading = () => (
    <Paper>
      <Loading />
    </Paper>
  );

  const renderEmpty = () => (
    <Paper>
      <Empty />
    </Paper>
  );

  return (
    <Grid>
      <Grid spacing={3} container alignItems="center">
        <Grid lg={6} item>
          <AwesomeFilter
            onApplyFilter={onApplyFilter}
            register={{
              filterOptions,
              getValues,
              onDeleteFilter,
              onFilterChange,
            }}
          />
        </Grid>
      </Grid>
      <TableContainer>
        {loading ? (
          renderLoading()
        ) : response?.result?.length === 0 ? (
          renderEmpty()
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((c, i) => (
                  <TableCell key={i} align="center">
                    {c.title}
                    {/* {c.sorting &&
                    getSortIcon(sorts as ISort[], c, handleSort, classes)} */}
                  </TableCell>
                ))}
                {actions?.length > 0 && (
                  <TableCell align="center">عملیات</TableCell>
                )}
              </TableRow>
            </TableHead>
            {response.result?.length > 0 && (
              <TableBody>
                {response.result?.map?.((item, k) => (
                  <TableRow key={k}>
                    {columns.map((c, i) => (
                      <TableCell align="center" key={i}>
                        {c.render ? c.render?.(item) : item[c.field as string]}
                      </TableCell>
                    ))}
                    <TableCell
                      align="center"
                      className={classes.actionButtonCell}
                    >
                      {actions.map(
                        (action, j) =>
                          !isHidden(action, item) && (
                            <ActionTooltip
                              key={j}
                              title={getTooltipTitle(action, item)}
                              arrow
                              placement="right"
                            >
                              <Button
                                className={classes.actionButton}
                                variant="contained"
                                disabled={isDisabled(action, item)}
                                onClick={() => getOnClickFunction(action, item)}
                              >
                                {getIcon(action, item)}
                              </Button>
                            </ActionTooltip>
                          )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}

        <Pagination
          totalCount={response.count}
          page={pagination.page}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
          size={pagination.size}
        />
      </TableContainer>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    "& .MuiTableHead-root": {
      "& .MuiTableRow-root": {
        "& .MuiTableCell-head": {
          border: 0,
          color: "#6e7182",
          fontSize: "14px",
        },
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          backgroundColor: "white",
          border: 0,
          paddingTop: ".75em",
          paddingBottom: ".75em",
          fontSize: "16px",
        },
      },
    },
  },
  actionButtonCell: {
    "& .MuiButton-root": {
      color: "#9093a0",
      maxWidth: "40px",
      maxHeight: "40px",
      height: "40px",
      padding: "0",
      border: "0",
      boxShadow: "none",
      width: "40px",
      minWidth: "40px",
      minHeight: "40px",
    },
    "& .MuiButton-contained": {
      backgroundColor: "#f8f7f7",
    },
    "& .Mui-disabled": {},
  },
  actionButton: {
    marginRight: ".25em",
  },
  sortIcon: {
    transform: "translateY(10px)",
    cursor: "pointer",
  },
}));
