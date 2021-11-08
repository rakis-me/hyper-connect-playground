type Unary = (x: any) => any 
type Fork = (rej: Unary, res: Unary) => void 

export const Async = (fork : Fork) => 
({
    ['@@type']: 'Async',
    fork,
    map: (fn : Unary) => Async((rej, res) => fork(rej, x => res(fn(x)))),
    chain: (fn: Unary) => Async((rej, res) => fork(rej, x => fn(x).fork(rej, res))),
    toPromise: (): Promise<any> => new Promise((resolve: Unary, reject: Unary) => fork(reject, resolve))
})

Async.of = (x : any) => Async((_rej, res) => res(x))
Async.fromPromise = (fn: Function) =>
  (...args: any[]) => Async(
    (rej, res) => fn(...args)
      .then(res, rej)
  )
 