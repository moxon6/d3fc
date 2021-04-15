import * as d3 from 'd3';
import { chartCartesian } from '../index';
import { CartesianChart } from '../src/cartesian';
import { expectType } from 'tsd'
import { ScaleIdentity, ScaleLinear, scaleTime, scaleLinear } from 'd3';

describe('chartCartesian', () => {
    it('can accept zero scale parameters', () => {
        expectType<CartesianChart<ScaleIdentity, ScaleIdentity>>(chartCartesian());
    })

    it('can accept one scale parameter', () => {
        expectType<CartesianChart<ScaleLinear<number, number, never>, ScaleIdentity>>(chartCartesian(d3.scaleLinear()));

        expectType<CartesianChart<d3.ScaleIdentity<never>, d3.ScaleLinear<number, number, never>>>(chartCartesian(undefined, d3.scaleLinear()));
    })

    it('can accept two scale parameters', () => {
        expectType<CartesianChart<d3.ScaleLinear<number, number, never>, d3.ScaleTime<number, number, never>>>(chartCartesian(d3.scaleLinear(), scaleTime()));
    })

    it('can accept a configuration object with one scale', () => {
        expectType<CartesianChart<d3.ScaleIdentity, d3.ScaleLinear<number, number, never>>>(chartCartesian({
            yScale: scaleLinear()
        }));
    })

    it('can accept a configuration object with both scales', () => {
        expectType<CartesianChart<d3.ScaleLinear<number, number, never>, d3.ScaleLinear<number, number, never>>>(chartCartesian({
            xScale: scaleLinear(),
            yScale: scaleLinear()
        }));
    })

    it('can accept a configuration object with optional xaxis, yaxis parameters', () => {
        expectType<CartesianChart<d3.ScaleLinear<number, number, never>, d3.ScaleLinear<number, number, never>>>(chartCartesian({
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
    })

    const chart = chartCartesian(d3.scaleLinear(), d3.scaleLinear())

    it('has rebound scale methods as any-typed methods', () => {
        expectType<(...args: any[]) => any>(chart.xInterpolate)
        expectType<any>(chart.xInterpolate());
        expectType<any>(chart.xInterpolate("an argument"))
    })

    it('has rebound store methods as any-typed methods', () => {
        expectType<(...args: any[]) => any>(chart.xTickArguments)
        expectType<any>(chart.xTickArguments());
        expectType<any>(chart.xTickArguments("an argument"))
    })
});
