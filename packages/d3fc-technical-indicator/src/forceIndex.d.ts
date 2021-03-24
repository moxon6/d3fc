export default function indicatorForceIndex(): ForceIndex<number>;
export default function indicatorForceIndex<T>(): ForceIndex<T>;

interface ForceIndex<T> {
    closeValue(): (datum: T) => number;
    closeValue(accessor: (datum: T) => number): ForceIndex<T>;

    volumeValue(): (datum: T) => number;
    volumeValue(accessor: (datum: T) => number): ForceIndex<T>;

    period(): (data: T[]) => number;
    period(x: (data: T[]) => number): ForceIndex<T>;
    period(x: number): ForceIndex<T>;

    (data: T[]): number[];
}