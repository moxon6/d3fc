import * as d3 from 'd3';
import { chartCanvasCartesian } from '../../index';
import { Functor } from '../../src/cartesian';
import { CartesianBaseChart } from '../../src/cartesianBase';
import { expectType } from 'tsd';
import { ScaleIdentity, ScaleLinear, scaleTime, scaleLinear } from 'd3';

// can accept zero scale parameters
expectType<CartesianBaseChart<ScaleIdentity, ScaleIdentity>>(chartCanvasCartesian());

// can accept one scale parameter
expectType<CartesianBaseChart<ScaleLinear<number, number, never>, ScaleIdentity>>(chartCanvasCartesian(d3.scaleLinear()));

expectType<CartesianBaseChart<d3.ScaleIdentity<never>, d3.ScaleLinear<number, number, never>>>(chartCanvasCartesian(undefined, d3.scaleLinear()));

// can accept two scale parameters
expectType<CartesianBaseChart<d3.ScaleLinear<number, number, never>, d3.ScaleTime<number, number, never>>>(chartCanvasCartesian(d3.scaleLinear(), scaleTime()));

// can accept a configuration object with one scale
expectType<CartesianBaseChart<d3.ScaleIdentity, d3.ScaleLinear<number, number, never>>>(chartCanvasCartesian({
    yScale: scaleLinear()
}));

// can accept a configuration object with both scales
expectType<CartesianBaseChart<d3.ScaleLinear<number, number, never>, d3.ScaleLinear<number, number, never>>>(chartCanvasCartesian({
    xScale: scaleLinear(),
    yScale: scaleLinear()
}));

// can accept a configuration object with optional xaxis, yaxis parameters
expectType<CartesianBaseChart<d3.ScaleLinear<number, number, never>, d3.ScaleLinear<number, number, never>>>(chartCanvasCartesian({
    xScale: scaleLinear(),
    yScale: scaleLinear(),
    xAxis: {
        top: null,
        bottom: null
    },
    yAxis: {
        left: null,
        right: null
    }
}));


const chart = chartCanvasCartesian(d3.scaleLinear(), d3.scaleLinear());

// has rebound scale methods as any-typed methods
expectType<(...args: any[]) => any>(chart.xInterpolate);
expectType<any>(chart.xInterpolate());
expectType<any>(chart.xInterpolate("an argument"));

// has rebound store methods as any-typed methods
expectType<(...args: any[]) => any>(chart.xTickArguments);
expectType<any>(chart.xTickArguments());
expectType<any>(chart.xTickArguments("an argument"));

// Has methods specific to cartesianbase instances
expectType<Functor<any>>(chart.plotArea());
