import extentLinear from '../src/linear';

extentLinear()
    .accessors([
        () => 5
    ]);

    extentLinear()
        .padUnit("domain");
    
    extentLinear()
        .padUnit();
