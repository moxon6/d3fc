import { expectAssignable, expectType } from 'tsd';
import rebind from './rebind';

interface Target {
    targetMethod(): void;
    anOverlappingMethodName(): boolean;
}

interface Source {
    sourceMethod(): void;
    anotherSourceMethod(): Source | boolean;
    yetAnotherSourceMethod(): number;
    anOverlappingMethodName(): string;
}

const target: Target = {
    targetMethod() {
        console.log("on target");
    },
    anOverlappingMethodName() {
        return false;
    }
}

const source: Source = {
    sourceMethod() {
        console.log("on source")
    },
    anOverlappingMethodName() {
        return "nope";
    },
    anotherSourceMethod() {
        if (Math.random() < 5) {
            return this as Source;
        } else {
            return true
        }
    },
    yetAnotherSourceMethod() {
        return 5;
    }
}

const firstRebind = rebind(target, source, 'yetAnotherSourceMethod', 'anOverlappingMethodName');
const secondRebind = rebind(target, source, 'anotherSourceMethod')

expectType<Target>(target);
expectType<Source>(source);

expectAssignable<{
    targetMethod(): void;
    anOverlappingMethodName(): string;
    yetAnotherSourceMethod(): number
}>(firstRebind);

expectAssignable<{
    targetMethod(): void;
    anOverlappingMethodName(): boolean;
    anotherSourceMethod(): Target | boolean;
}>(secondRebind);
