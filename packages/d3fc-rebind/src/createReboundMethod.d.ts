export default function createReboundMethod<TTarget, TSource>(target: TTarget, source: TSource, name: keyof TSource): (...args: any[]) => any;
