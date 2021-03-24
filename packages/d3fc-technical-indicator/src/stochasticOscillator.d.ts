export default function indicatorStochasticOscillator(): StochasticOscillator<number>;
export default function indicatorStochasticOscillator<T>(): StochasticOscillator<T>;

interface StochasticOscillator<T> {
    closeValue(): (datum: T) => number;
    closeValue(accessor: (datum: T) => number): StochasticOscillator<T>;

    highValue(): (datum: T) => number;
    highValue(accessor: (datum: T) => number): StochasticOscillator<T>;

    lowValue(): (datum: T) => number;
    lowValue(accessor: (datum: T) => number): StochasticOscillator<T>;

    kPeriod(): (data: T[]) => number;
    kPeriod(x: (data: T[]) => number): StochasticOscillator<T>;
    kPeriod(x: number): StochasticOscillator<T>;

    dPeriod(): (data: T[]) => number;
    dPeriod(x: (data: T[]) => number): StochasticOscillator<T>;
    dPeriod(x: number): StochasticOscillator<T>;

    (data: T[]): number[];
}