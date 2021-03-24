export default function indicatorMacd(): MACD<number>;
export default function indicatorMacd<T>(): MACD<T>;

interface MacdDatum {
    macd: number;
    signal: number;
    divergence: number;
}

interface MACD<T> {
    value(): (datum: T, index: number) => number;
    value(accessor: (datum: T, index: number) => number): MACD<T>;

    fastPeriod(): (data: T[]) => number;
    fastPeriod(x: (data: T[]) => number): MACD<T>;
    fastPeriod(x: number): MACD<T>;

    slowPeriod(): (data: T[]) => number;
    slowPeriod(x: (data: T[]) => number): MACD<T>;
    slowPeriod(x: number): MACD<T>;

    signalPeriod(): (data: T[]) => number;
    signalPeriod(x: (data: T[]) => number): MACD<T>;
    signalPeriod(x: number): MACD<T>;

    (data: T[]): MacdDatum[];
}