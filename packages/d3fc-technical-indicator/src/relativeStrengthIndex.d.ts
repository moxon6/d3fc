export default function indicatorRelativeStrengthIndex(): RSI<number>;
export default function indicatorRelativeStrengthIndex<T>(): RSI<T>;

interface RSI<T> {
    value(): (datum: T, index: number) => number;
    value(accessor: (datum: T, index: number) => number): RSI<T>;

    period(): (data: T[]) => number;
    period(x: (data: T[]) => number): RSI<T>;
    period(x: number): RSI<T>;

    (data: T[]): number[];
}