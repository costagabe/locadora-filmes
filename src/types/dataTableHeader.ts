export type SelectItemKey = boolean | null | undefined | string | (string | number)[] | ((item: Record<string, any> | any, fallback?: any) => any);

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
export type DataTableHeader = {
    key?: "data-table-group" | "data-table-select" | "data-table-expand" | (string & {});
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: "start" | "end" | "center";
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};
