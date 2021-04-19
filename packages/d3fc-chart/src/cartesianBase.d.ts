import { CartesianChart, Functor, CartesianChartConfigurationParameter, Scale, Fallback } from "./cartesian";

type PickXYProperties<T> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [K in keyof T as K extends `${'x' | 'y'}${infer _}` ? K : never]: T[K]
};

export type CartesianBaseChart<XScale, YScale> = 
    PickXYProperties<CartesianChart<XScale, YScale>> & 
    Pick<CartesianChart<XScale, YScale>, 'chartLabel'> & 
    {
        plotArea(): Functor<any>;
        plotArea(plotArea: any): CartesianBaseChart<XScale, YScale>;
    };

export function CartesianBase<XScale extends Scale | undefined, YScale extends Scale | undefined>(configuration: CartesianChartConfigurationParameter<XScale, YScale>)
    : CartesianBaseChart<Fallback<XScale>, Fallback<YScale>>;

export function CartesianBase<XScale extends Scale | undefined, YScale extends Scale | undefined>(xScale?: XScale, yScale?: YScale)
    : CartesianBaseChart<Fallback<XScale>, Fallback<YScale>>;

export type CartesianBase = typeof CartesianBase;

export { };
