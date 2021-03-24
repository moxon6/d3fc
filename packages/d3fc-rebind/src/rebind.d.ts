export default function rebind<TTarget, TSource>(target: TTarget, source: TSource, ...names: (keyof TSource)[]): TTarget & Pick<TSource, keyof TSource>;
