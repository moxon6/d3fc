export default function indicatorMovingAverage(): MovingAverage<number>;
export default function indicatorMovingAverage<T>(): MovingAverage<T>;

interface MovingAverage<T> {
    value(): (datum: T, index: number) => number;
    value(accessor: (datum: T, index: number) => number): MovingAverage<T>;

    period(): (data: T[]) => number;
    period(x: (data: T[]) => number): MovingAverage<T>;
    period(x: number): MovingAverage<T>;

    (data: T[]): number[];
}