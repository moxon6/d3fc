import store from '../src/store';

const component = () => {
    const instance = {};
    instance.ticks = (...args) => {
        instance.ticksValue = args;
    };
    return instance;
};

describe('store', () => {

    it('Should re-apply stored property values', function() {
        // store values for 'ticks' property
        let myStore = store('ticks');
        myStore.ticks(22);

        // re-apply these to a new component
        const componentInstance = component();
        myStore(componentInstance);

        expect(componentInstance.ticksValue).toEqual([22]);
    });

    it('Should re-apply multiple argument values', function() {
        // store values for 'ticks' property
        let myStore = store('ticks');
        myStore.ticks(22, 's');

        // re-apply these to a new component
        const componentInstance = component();
        myStore(componentInstance);

        expect(componentInstance.ticksValue).toEqual([22, 's']);
    });

    it('should throw when target is missing required method', function() {
        // store values for 'ticks' property
        let myStore = store('ticks', 'anotherTicks');
        myStore.ticks(22, 's');
        myStore.anotherTicks(23, 't');

        // re-apply these to a new component
        const componentInstance = component();
        
        expect(() => myStore(componentInstance)).toThrow();
    })
});
