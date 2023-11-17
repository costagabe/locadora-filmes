export type Nullable<T> = {
    [P in keyof T]: T[P] extends object ? (T[P] extends Array<any> ? T[P] : Nullable<T[P]>) : T[P] | null;
};