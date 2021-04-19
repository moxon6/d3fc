import type { ScaleIdentity } from 'd3-scale';
import type { Store } from './store';

export type Functor<T> = ((...args: any[]) => T);

type TypeOrFunctor<T> = T | Functor<T>;

type AnyFunction = (...args: any[]) => any;

export interface WebglPlotArea {
    (d: any): any;
    context(canvas: HTMLCanvasElement): this;
    pixelRatio(pixelRatio: number): this;
    xScale(scale: any): this;
    yScale(scale: any): this;
}

export interface CanvasPlotArea {
    (d: any): any;
    context(canvas: HTMLCanvasElement): this;
    xScale(scale: any): this;
    yScale(scale: any): this;
}

export interface SvgPlotArea {
    (d: any): any;
    xScale(scale: any): this;
    yScale(scale: any): this;
}

type Decorator = (container: d3.Selection<any, any, any, any>, data: any, index: number) => void;

type PrefixProperties<T, Prefix extends string> = {
    [Property in keyof T as `${Prefix}${Capitalize<string & Property>}`]: T[Property]
};

type AnyMethods<T> = {
    [Property in keyof T]: T[Property] extends AnyFunction ? AnyFunction : T[Property]
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OmitPrefixes<T> = {[K in keyof T as K extends `${ 'range' | 'tickFormat' }${infer _}` ? never : K]: T[K]};

type XOrient = 'top' | 'bottom' | 'none';
type YOrient = 'left' | 'right' | 'none';
type AxisStore = Store<'tickFormat' | 'ticks' | 'tickArguments' | 'tickSize' | 'tickSizeInner' | 'tickSizeOuter' | 'tickValues' | 'tickPadding' | 'tickCenterLabel'>;

/**
 * Cartesian Chart
 */
export type CartesianChart<XScale, YScale> = {
    (selection: d3.Selection<any, any, any, any>): void;

    /**
     * Returns the existing component.
     */
    canvasPlotArea(): CanvasPlotArea;

    /**
     * Sets the component to render onto the canvas, and returns the Cartesian chart. 
     * For series that contain a very high number of data-points, rendering to canvas can reduce the rendering time and improve performance. 
     * For `canvasPlotArea` and `webglPlotArea`, the relevant context is automatically applied to the chart.
     */
    canvasPlotArea(plotArea: CanvasPlotArea): CartesianChart<XScale, YScale>;

    chartLabel(): Functor<string>;
    chartLabel(label: TypeOrFunctor<string>): CartesianChart<XScale, YScale>;

    decorate(): Decorator;
    decorate(decorate: Decorator): CartesianChart<XScale, YScale>;

    /**
     * Returns the existing component.
     */
    svgPlotArea(): SvgPlotArea;

    /**
     * Sets the component to render onto the SVG, and returns the Cartesian chart. 
     * For components that require user-interaction, rendering to SVG can simplify their implementation.
     */
    svgPlotArea(plotArea: SvgPlotArea): CartesianChart<XScale, YScale>;

    useDevicePixelRatio(): boolean;
    useDevicePixelRatio(useDevicePixelRatio: boolean): CartesianChart<XScale, YScale>;

    /**
     * Returns the existing component.
     */
    webglPlotArea(): WebglPlotArea;

    /**
     * Sets the component to render, and returns the Cartesian chart. 
     * For `canvasPlotArea` and `webglPlotArea`, the relevant context is automatically applied to the chart.
     */
    webglPlotArea(plotArea: WebglPlotArea): CartesianChart<XScale, YScale>;

    xAxisHeight(): Functor<string>;
    xAxisHeight(height: TypeOrFunctor<string>): CartesianChart<XScale, YScale>;

    xDecorate(): Decorator;
    xDecorate(decorate: Decorator): CartesianChart<XScale, YScale>;

    xLabel(): Functor<string>;
    xLabel(label: TypeOrFunctor<string>): CartesianChart<XScale, YScale>;

    xOrient(): Functor<XOrient>;
    xOrient(orient: XOrient): CartesianChart<XScale, YScale>;

    yAxisWidth(): Functor<string>;
    yAxisWidth(height: TypeOrFunctor<string>): CartesianChart<XScale, YScale>;

    yDecorate(): Decorator;
    yDecorate(decorate: Decorator): CartesianChart<XScale, YScale>;

    yLabel(): Functor<string>;
    yLabel(label: TypeOrFunctor<string>): CartesianChart<XScale, YScale>;

    yOrient(): Functor<YOrient>;
    yOrient(orient: YOrient): CartesianChart<XScale, YScale>;
}
    & AnyMethods<PrefixProperties<OmitPrefixes<XScale>, 'x'>>
    & AnyMethods<PrefixProperties<OmitPrefixes<XScale>, 'y'>>
    & AnyMethods<PrefixProperties<AxisStore, 'x'>>
    & AnyMethods<PrefixProperties<AxisStore, 'y'>>;

export type Fallback<T> = undefined extends T ? ScaleIdentity : T;

export interface Scale {
    range: any;
    domain: any;
}

export interface CartesianChartConfigurationParameter<XScale, YScale> {
    xScale?: XScale;
    yScale?: YScale;
    xAxis?: {
        top?: any;
        bottom?: any;
    };
    yAxis?: {
        left?: any;
        right?: any;
    };
}

// -------------------------------------------------------------------------------
// Cartesian Chart Factory
// -------------------------------------------------------------------------------

/**
 * Constructs a new Cartesian chart with the given scales and axis components.
 * If xAxis is specified, it must be an object with the required x-axis factory function (top if xOrient="top" or bottom if xOrient="bottom").
 * If yAxis is specified, it must be an object with the required y-axis factory function (left if yOrient="left" or right if yOrient="right").
 * @param configuration 
 */
export default function Cartesian<XScale extends Scale | undefined, YScale extends Scale | undefined>(configuration: CartesianChartConfigurationParameter<XScale, YScale>)
    : CartesianChart<Fallback<XScale>, Fallback<YScale>>;

/**
 * Constructs a new Cartesian chart with the given scales.
 * @param xScale 
 * @param yScale 
 */
export default function Cartesian<XScale extends Scale | undefined, YScale extends Scale | undefined>(xScale?: XScale, yScale?: YScale)
    : CartesianChart<Fallback<XScale>, Fallback<YScale>>;

export { };
