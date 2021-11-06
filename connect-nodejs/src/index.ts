import fetch, { Request } from 'node-fetch'

import data from './core/data'
import { buildRequest } from './utils'

interface HyperData<Type> {
  add: (body: Type) => Type,
  get: (id: string) => Type,
  list: (options?: unknown) => Promise<unknown>,
  update: (id: string, doc: unknown) => Promise<unknown>,

}

interface Hyper {
  data: HyperData<unknown>
}

export function connect (CONNSTRING : string ) {
  
  const br = buildRequest(new URL(CONNSTRING))
  return function hyper (domain: string = 'default') : Hyper  {
    function doRequest(x : any ) {
      return function (request : Request) {
        return x.runWith(request).toPromise()
      }
    }
    function doFetch(r: Request) {
      return fetch(r).then(res => {
        if (res?.headers?.get('content-type')?.includes('application/json')) {
          return res.json()
        } else {
          return res.text()
        }
      })
    }
    return {
      data: {
        add: (body: unknown) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.add(body)))
            .then(doFetch),
        get: (id: string) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.get(id)))
            .then(doFetch),
        list: (options?: unknown) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.list(options)))
            .then(doFetch)
        ,
        update: (id: string, doc: unknown) =>
          Promise.resolve(br('data', domain))
            .then(doRequest(data.update(id, doc)))
            .then(doFetch) 
      }
    }
  }
}
