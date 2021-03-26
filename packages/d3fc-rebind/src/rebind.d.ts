type GetterSetter<ThisType, ValueType> = {
    (): ValueType;
    (value: ValueType): ThisType;
}


export type ReplaceReturnTypeIfExists<TInputFunction extends ((...args: any[]) => any), TRemove, TReplaceWith> =
    TInputFunction extends GetterSetter<TRemove, infer U>
    ? GetterSetter<TReplaceWith, U>
    : TInputFunction


export type PickMethodsAndReplaceReturnType<TTarget, TSource, TMethodNames extends keyof TSource> = {
    [P in TMethodNames]: (TSource[P] extends ((...args: any[]) => any)
        ? ReplaceReturnTypeIfExists<TSource[P], TSource, TTarget>
        : TSource[P]
    )
}

export default function rebind<TTarget, TSource, TName extends keyof TSource>(target: TTarget, source: TSource, ...names: TName[]):
    Omit<TTarget, TName> & PickMethodsAndReplaceReturnType<TTarget, TSource, TName>;
