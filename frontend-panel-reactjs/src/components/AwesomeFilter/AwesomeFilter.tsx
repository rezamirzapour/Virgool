import {
  Filters,
  FilterOptions,
  DateTimeRangeValue,
  NumberRangeValue,
} from "./items/interface";
import { Grid, Select, MenuItem, Button, Chip } from "@mui/material";
import { Sort as SortIcon } from "@mui/icons-material";
import { useState } from "react";
import {
  TextFieldFilter,
  SelectFilter,
  DateTimeRangeFilter,
  NumberRangeFilter,
} from "./items";

type Key = "label" | "field";
interface IProps {
  onApplyFilter: () => void;
  register: {
    onFilterChange: (filters: Filters) => void;
    filterOptions: FilterOptions;
    getValues: (key: Key) => Record<string, any>;
    onDeleteFilter: (label: string) => void;
  };
}

export default function AwesomeFilter(props: IProps) {
  const {
    onApplyFilter,
    register: { filterOptions, onFilterChange, getValues, onDeleteFilter },
  } = props;
  const [currentFilter, setCurrentFilter] = useState(
    filterOptions.filters.find((f) => f.label === filterOptions.defaultFilter)
  );
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const onSelectChange = (label: string) => {
    const targetFilter = filterOptions.filters.find((f) => f.label === label);
    setCurrentFilter(targetFilter);
  };

  function commonOnChange<T>(label: string, value: T) {
    const previousValue = [...filterOptions.filters];
    const target = previousValue.find((f) => f.label === label);
    if (target) target.value = value;
    onFilterChange(previousValue);
  }

  const onDeleteChip = (label: string) => {
    onDeleteFilter(label);
    setAppliedFilters((pre) => {
      const cloneObj = { ...pre };
      delete cloneObj[label];
      return cloneObj;
    });
    onApplyFilter();
  };

  const onTextFieldFilterChange = (label: string, value: string | number) => {
    commonOnChange(label, value);
  };

  const onDateTimeRangeChange = (label: string, value: DateTimeRangeValue) => {
    commonOnChange(label, value);
  };

  const onNumberRangeChange = (label: string, value: NumberRangeValue) => {
    commonOnChange(label, value);
  };

  const getInput = () => {
    switch (currentFilter?.type) {
      case "STRING":
        return (
          <TextFieldFilter
            value={currentFilter?.value}
            onChange={(ev) =>
              onTextFieldFilterChange(currentFilter.label, ev.target.value)
            }
          />
        );
      case "SELECT":
        return (
          <SelectFilter
            options={currentFilter.options}
            selectProps={{
              value: currentFilter?.value,
              onChange: (ev) =>
                onTextFieldFilterChange(
                  currentFilter.label,
                  ev.target.value as string
                ),
            }}
          />
        );
      case "DATE_TIME_RANGE":
        return (
          <DateTimeRangeFilter
            value={currentFilter.value}
            onChange={(value) =>
              onDateTimeRangeChange(currentFilter.label, value)
            }
          />
        );
      case "NUMBER_RANGE":
        return (
          <NumberRangeFilter
            value={currentFilter.value}
            onChange={(value) =>
              onNumberRangeChange(currentFilter.label, value)
            }
          />
        );
    }
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item lg={4}>
        <Select
          variant="outlined"
          fullWidth
          value={currentFilter?.label}
          onChange={(ev) => onSelectChange(ev.target.value as string)}
        >
          {filterOptions.filters.map((filter) => (
            <MenuItem key={filter.label} value={filter.label}>
              {filter.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item lg={5}>
        {getInput()}
      </Grid>
      <Grid item lg={3}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            onApplyFilter();
            setAppliedFilters(getValues("label"));
          }}
          endIcon={<SortIcon />}
        >
          اعمال فیلتر
        </Button>
      </Grid>
      <Grid item xs={12}>
        {Object.entries(appliedFilters).map(([label, value]) => (
          <Chip
            key={label}
            label={`${label}: ${value}`}
            color="primary"
            onDelete={() => onDeleteChip(label)}
          />
        ))}
      </Grid>
    </Grid>
  );
}
