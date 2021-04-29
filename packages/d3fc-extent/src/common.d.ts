type Accessor<T> = (d: any) => T | T[];
type Pad = [number, number];
type PadUnit = "domain" | "percent";
type SymmetricalAbout = number | null;

export interface Extent<T extends number | Date> {
    (data: any[]): [T, T];

    /**
     * Returns the current array of value accessors, which defaults [].
     */
    accessors(): Accessor<T>[];

    /**
     * Sets the array of value accessors to the specified array and returns this extent instance.
     * The accessors are applied to each data value before computing the extent.
     * Defaults to an identity function (i.e. d => d).
     * @param accessors
     */
    accessors(accessors: Accessor<T>[]): this;
    
    /**
     * Returns the current array of padding values, which defaults [0, 0].
     */
    pad(): Pad;
    
    /**
     * Sets the amount of padding applied to the minimum and maximum values of the extent
     * to the specified array [minPad, maxPad] and returns this extent instance. 
     * The unit of these values is set by padUnit.
     * @param pad
     */
    pad(pad: Pad): this;
    
    /**
     * Returns the current array of padding unit, which defaults `'percent'`.
     */
    padUnit(): PadUnit;
    
    /**
     * If value is specified, sets the unit of the pad values applied to minimum and maximum values and returns this extent instance. Possible values are:
     * - `'percent'` - the default behavior of applying the values as a percentage of the extent e.g. pad values of [0.5, 0.5] would double the calculated extent.
     * - `'domain'` - the padding values specified are applied directly to the calculated extent. 
     * @param padUnit 
     */
    padUnit(padUnit: PadUnit): this;
    
    include(): number[];
    include(include: number[]): this;
    
    symmetricalAbout(): SymmetricalAbout;
    symmetricalAbout(symmetricalAbout: SymmetricalAbout): this;
}
