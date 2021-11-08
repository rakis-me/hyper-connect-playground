import * as data from './services/data'
import { Async } from './utils/async'
import { hyper, HyperRequest } from './utils/hyper-request'
import fetch, { Request } from 'node-fetch'

interface Result {
  ok: boolean
}

export interface HyperData {
  add: <Type>(body: Type) => Promise<Request>,
  // get: <Type>(id: string) => Promise<Type>,
  // list: <T>(options?: ListOptions) => Promise<Results<T>>,
  // update: <Type>(id: string, doc: Type) => Promise<Result>,
  // remove: (id: string) => Promise<Result>,
  // query: <T>(selector: unknown, options?: QueryOptions) => Promise<Results<T>>,
  // index: (name: string, fields: Array<string>) => Promise<Result>,
  // bulk: <Type>(docs: Array<Type>) => Promise<Result>
}

interface Hyper {
  data: HyperData
}

export function connect(CONNECTION_STRING: string, domain : string = 'default') : Hyper {
  const config = new URL(CONNECTION_STRING)
 
  const h = async (hyperRequest : HyperRequest) => {
    const { url, options } = await hyper(config, domain)(hyperRequest)
    console.log({url})
    return new Request(url, options)
  }
  
  const log = (x : any) => (console.log(x), x)

  return {
    data: {
      add: (body) => Async.of(h)
        .chain(hyper => Async.fromPromise(data.add(body)(hyper)))
        .chain(request => Async.fromPromise(fetch)(request))
        .chain(response => Async.fromPromise(response.json.bind(response))() )
        .toPromise()
    }
  }
} 

