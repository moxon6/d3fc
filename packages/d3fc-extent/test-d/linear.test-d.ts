import { extentLinear, ExtentLinear, Accessor, Pad, PadUnit } from '../index';
import { expectType } from 'tsd';

const extent = extentLinear();

// Has the correct type on creation
expectType<ExtentLinear>(extent);

expectType<Accessor<number>[]>(extent.accessors());
expectType<ExtentLinear>(extent.accessors([ x => 2 * x ]));

expectType<Pad>(extent.pad());
expectType<ExtentLinear>(extent.pad([ 1, 2]));

expectType<PadUnit>(extent.padUnit());
expectType<ExtentLinear>(extent.padUnit("domain"));

expectType<number[]>(extent.include());
expectType<ExtentLinear>(extent.include([1,2,3]));

expectType<number | null>(extent.symmetricalAbout());
expectType<ExtentLinear>(extent.symmetricalAbout(5));
