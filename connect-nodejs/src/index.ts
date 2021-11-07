import fetch, { Request, Response } from 'node-fetch'
import { URL } from "url"

import data from './core/data'
import { buildRequest } from './utils'

interface Result {
  ok: boolean,
  id?: string,
  msg?: string,
  error?: string
}

interface Results <Type> {
  ok: boolean,
  docs: Type[]
}

interface ListOptions {
  limit?: number,
  startkey?: string,
  endkey?: string,
  keys: string[],
  descending: boolean
}

enum SortOptions {
  DESC = 'DESC',
  ASC = 'ASC'
}

interface QueryOptions {
  fields?: string[],
  sort?: {[k:string]: SortOptions}[],
  limit?: number,
  use_index?: string
}

interface HyperData {
  add: <Type>(body: Type) => Promise<Result>,
  get: <Type>(id: string) => Promise<Type>,
  list: <T>(options?: ListOptions) => Promise<Results<T>>,
  update: <Type>(id: string, doc: Type) => Promise<Result>,
  remove: (id: string) => Promise<Result>,
  query: <T>(selector: unknown, options?: QueryOptions) => Promise<Results<T>>,
  index: (name: string, fields: Array<string>) => Promise<Result>,
  bulk: <Type>(docs: Array<Type>) => Promise<Result>
}

interface Hyper {
  data: HyperData
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
