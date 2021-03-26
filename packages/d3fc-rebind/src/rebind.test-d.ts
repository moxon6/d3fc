import { expectAssignable, expectNotAssignable, expectType } from 'tsd';
import rebind from './rebind';

class Target {
    targetMethod(): void {
        console.log("on target");
    }
    anOverlappingMethodName() {
        return false;
    }
}

class Source {
    _value: boolean = false;

    sourceMethod() {
        console.log("on source")
    }

    anOverlappingMethodName() {
        return "nope";
    }

    aGetterSetterExample(value?: boolean): boolean | Source {
        if (typeof value === "boolean") {
            this._value = value;
            return this as Source;
        } else {
            return this._value
        }
    }

    anotherSourceMethod() {
        return 5;
    }
}

test("Return types of source class getter/setter", () => {
    const source = new Source();
    expectType<boolean>(source.aGetterSetterExample() as boolean)
    expectType<Source>(source.aGetterSetterExample(true) as Source)
})

test("Rebinding a single source method", () => {
    const source = new Source();
    const target = new Target();
    const reboundObject = rebind(target, source, 'sourceMethod');

    expectAssignable<{
        targetMethod(): void;
        anOverlappingMethodName(): boolean;
        sourceMethod(): void
    }>(reboundObject);

});

test("Rebinding an overlapping source method name takes the source type and removes the original target method", () => {
    const source = new Source();
    const target = new Target();
    const reboundObject = rebind(target, source, 'anOverlappingMethodName');

    expectAssignable<{
        targetMethod(): void;
        anOverlappingMethodName(): string;
    }>(reboundObject);

    expectNotAssignable<{
        targetMethod(): void;
        anOverlappingMethodName(): boolean;
    }>(reboundObject);
})

test("Rebinding a method from Source that can return Source will return Target in it's place", () => {
    const source = new Source();
    const target = new Target();
    const reboundObject = rebind(target, source, 'aGetterSetterExample');

    expectType<boolean>(source.aGetterSetterExample() as boolean);
    expectType<boolean>(reboundObject.aGetterSetterExample() as boolean);

    expectType<Source>(source.aGetterSetterExample(true) as Source);
    expectType<Target>(reboundObject.aGetterSetterExample() as Target);

    expectNotAssignable<{
        aGetterSetterExample(): boolean | Source
    }>(reboundObject);

    expectAssignable<{
        aGetterSetterExample(): boolean | Target
    }>(reboundObject);
})

test("Rebinding multiple methods from Source to test works", () => {
    const source = new Source();
    const target = new Target();
    const reboundObject = rebind(target, source, 'sourceMethod', 'anotherSourceMethod');

    expectAssignable<{
        targetMethod(): void;
        anOverlappingMethodName(): boolean;
        sourceMethod(): void
        anotherSourceMethod(): number
    }>(reboundObject);
})

test("Transitive rebinding works as expected", () => {
    const source = new Source();
    const target = new Target();
    const reboundObject = rebind(target, source, 'sourceMethod');
    const rereboundObject = rebind(reboundObject, source, 'anotherSourceMethod');

    expectAssignable<{
        targetMethod(): void;
        anOverlappingMethodName(): boolean;
        sourceMethod(): void
        anotherSourceMethod(): number
    }>(rereboundObject);
})
