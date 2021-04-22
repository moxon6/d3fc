type Accessor<T> = (d: any) => T | T[];
type Pad = [number, number];
type PadUnit = "domain" | "percent";
type SymmetricalAbout = number | null;

export interface Extent<T> {
    (data: any[]): [T, T];
    
    accessors(): Accessor<T>[];
    accessors(accessors: Accessor<T>[]): this;
    
    pad(): Pad;
    pad(pad: Pad): this;
    
    padUnit(): PadUnit;
    padUnit(padUnit: PadUnit): this;
    
    include(): number[];
    include(include: number[]): this;
    
    symmetricalAbout(): SymmetricalAbout;
    symmetricalAbout(symmetricalAbout: SymmetricalAbout): this;
}
