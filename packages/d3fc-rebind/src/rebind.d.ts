type ReplaceTypeIfExistsWith<TInput, TRemove, TReplaceWith> = TInput extends TRemove
    ? Exclude<TInput, TRemove> | TReplaceWith
    : TInput

// TODO: There's probably a builtin for this somewhere?
type ArrowFunction = (...args: any[]) => any

type ReplaceReturnTypeIfExists<TInputFunction extends ArrowFunction, TRemove, TReplaceWith> = (...args: Parameters<TInputFunction>)
    => ReplaceTypeIfExistsWith<ReturnType<TInputFunction>, TRemove, TReplaceWith>

type PickMethodsAndReplaceReturnType<TTarget, TSource, TMethodNames extends keyof TSource> = {
    [P in TMethodNames]: TSource[P] extends ArrowFunction
    ? ReplaceReturnTypeIfExists<TSource[P], TSource, TTarget>
    : TSource[P]
}

export default function rebind<TTarget, TSource, TName extends keyof TSource>(target: TTarget, source: TSource, ...names: TName[]):
    Omit<TTarget, TName> & PickMethodsAndReplaceReturnType<TTarget, TSource, TName>;
