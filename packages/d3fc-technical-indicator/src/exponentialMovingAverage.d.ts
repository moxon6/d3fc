export default function indicatorExponentialMovingAverage(): ExponentialMovingAverage<number>;
export default function indicatorExponentialMovingAverage<T>(): ExponentialMovingAverage<T>;

interface ExponentialMovingAverage<T> {
    value(): (datum: T, index: number) => number;
    value(accessor: (datum: T, index: number) => number): ExponentialMovingAverage<T>;

    period(): (data: T[]) => number;
    period(x: (data: T[]) => number): ExponentialMovingAverage<T>;
    period(x: number): ExponentialMovingAverage<T>;

    (data: T[]): number[];
}
