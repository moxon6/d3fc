
export default function indicatorBollingerBands(): BollingerBands<number>;
export default function indicatorBollingerBands<T>(): BollingerBands<T>;

interface BollingerBandsDatum {
    upper: number,
    average: number;
    lower: number;
}

interface BollingerBands<T> {
    value(): (datum: T, index: number) => number;
    value(accessor: (datum: T, index: number) => number): BollingerBands<T>;

    period(): number;
    period(x: number): BollingerBands<T>;

    multiplier(): number;
    multiplier(x: number): BollingerBands<T>;

    (data: T[]): BollingerBandsDatum[];
}
