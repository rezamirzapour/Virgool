
export interface IndexedSignuate {
    [key: string]: any;
}

export interface BasicFilter<T = any> {
    type: 'STRING' | 'NUMBER'
    field: T extends IndexedSignuate ? keyof T : string
    label: string
    value: string | number
}

export interface SelectFilter<T = any> {
    type: 'SELECT';
    field: T extends IndexedSignuate ? keyof T : string;
    label: string;
    value: any;
    options: { label: string, value: any }[]
}

export interface DateTimeRangeValue {
    start: Date | null
    end: Date | null
}

export interface DateTimeRangeFilter<T = any> {
    type: 'DATE_TIME_RANGE';
    field: {
        start: T extends IndexedSignuate ? keyof T : string;
        end: T extends IndexedSignuate ? keyof T : string;
    };
    label: string;
    value: DateTimeRangeValue;
    requireBoth?: boolean
}

export interface NumberRangeValue {
    start: number | null
    end: number | null
}

export interface NumberRangeFilter<T = any> {
    type: 'NUMBER_RANGE';
    field: {
        start: T extends IndexedSignuate ? keyof T : string;
        end: T extends IndexedSignuate ? keyof T : string;
    };
    label: string;
    value: NumberRangeValue;
    requireBoth?: boolean
}

export type Filter<T = any> = BasicFilter<T> | SelectFilter<T> | DateTimeRangeFilter<T> | NumberRangeFilter<T>

export type Filters<T = any> = Filter<T>[]

export interface FilterOptions<T = any> {
    filters: Filters<T>;
    defaultFilter: string;
}