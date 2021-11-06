import fetch, { Request, Response } from 'node-fetch'
import { URL } from "url"

import data from './core/data'
import { buildRequest } from './utils'

interface HyperData<Type> {
  add: (body: Type) => Promise<any>,
  get: (id: string) => Promise<Type | unknown>,
  list: (options?: unknown) => Promise<any>,
  update: (id: string, doc: unknown) => Promise<any>,
  remove: (id: string) => Promise<any>,
  query: (selector: unknown, options?: unknown) => Promise<any>,
  index: (name: string, fields: Array<string>) => Promise<any>,
  bulk: (docs: Array<any>) => Promise<any>
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

      function handleResponse(res: Response) {
        if (res?.headers?.get('content-type')?.includes('application/json')) {
          return res.json()
        } else {
          return res.text()
        }
      }

      return fetch(r).then(handleResponse)
    }
    return {
      data: {
        add: (body) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.add(body)))
            .then(doFetch),
        get: (id) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.get(id)))
            .then(doFetch),
        list: (options) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.list(options)))
            .then(doFetch)
        ,
        update: (id, doc) =>
          Promise.resolve(br('data', domain))
            .then(doRequest(data.update(id, doc)))
            .then(doFetch) ,
        remove: (id) =>
          Promise.resolve(br('data', domain))
            .then(doRequest(data.remove(id)))
            .then(doFetch),
        query: (selector, options) =>
          Promise.resolve(br('data', domain))
            .then(doRequest(data.query(selector, options)))
            .then(doFetch),
        index: (name, fields) =>
          Promise.resolve(br('data', domain))
            .then(doRequest(data.index(name, fields)))
            .then(doFetch),
        bulk: (docs) => 
          Promise.resolve(br('data', domain))
            .then(doRequest(data.bulk(docs)))
            .then(doFetch),
      }
    }
  }
}
