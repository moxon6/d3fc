import { CartesianChart, CartesianChartConfigurationParameter, Scale, Fallback } from "./cartesian";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StartsWith<K, TPrefix extends string> = K extends `${TPrefix}${infer _}` ? K : never;

type PickXYProperties<T> = {
    [K in keyof T as StartsWith<K, 'x' | 'y'> ]: T[K]
};

export type CartesianBaseChart<XScale, YScale> = 
    PickXYProperties<CartesianChart<XScale, YScale>> & 
    Pick<CartesianChart<XScale, YScale>, 'chartLabel'> & 
    {
        /**
         * Returns the existing component.
         */
        plotArea(): any;

        /**
         * Sets the component to render and returns the Cartesian chart. 
         * @param component
         */
        plotArea(component: any): CartesianBaseChart<XScale, YScale>;
    };

export function CartesianBase<XScale extends Scale | undefined, YScale extends Scale | undefined>(configuration: CartesianChartConfigurationParameter<XScale, YScale>)
    : CartesianBaseChart<Fallback<XScale>, Fallback<YScale>>;

export function CartesianBase<XScale extends Scale | undefined, YScale extends Scale | undefined>(xScale?: XScale, yScale?: YScale)
    : CartesianBaseChart<Fallback<XScale>, Fallback<YScale>>;

export type CartesianBase = typeof CartesianBase;

export { };
