export default function indicatorEnvelope(): Envelope<number>;
export default function indicatorEnvelope<T>(): Envelope<T>;

interface EnvelopeDatum {
    upper: number;
    lower: number;
}

interface Envelope<T> {
    value(): (datum: T) => number;
    value(accessor: (datum: T) => number): Envelope<T>;

    factor(): number;
    factor(x: number): Envelope<T>;

    (data: T[]): EnvelopeDatum[];
}