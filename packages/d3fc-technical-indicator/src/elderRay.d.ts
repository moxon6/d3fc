export default function indicatorElderRay(): ElderRay<number>;
export default function indicatorElderRay<T>(): ElderRay<T>;

interface ElderRayDatum {
    bullPower: number;
    bearPower: number;
}

interface ElderRay<T> {
    closeValue(): (datum: T, index: number) => number;
    closeValue(accessor: (datum: T, index: number) => number): ElderRay<T>;

    highValue(): (datum: T) => number;
    highValue(accessor: (datum: T) => number): ElderRay<T>;

    lowValue(): (datum: T) => number;
    lowValue(accessor: (datum: T) => number): ElderRay<T>;

    period(): (data: T[]) => number;
    period(x: (data: T[]) => number): ElderRay<T>;
    period(x: number): ElderRay<T>;

    (data: T[]): ElderRayDatum[];
}