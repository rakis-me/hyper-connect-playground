import data from './core/data'
import { buildRequest } from './utils'

interface HyperData {
  add: Function,
  get: Function
}

interface Hyper {
  data: HyperData
}

export function connect (CONNSTRING : string) {
  console.log(CONNSTRING)
  const br = buildRequest(new URL(CONNSTRING))
  return function hyper (domain: string = 'default') : Hyper  {
    function doRequest(x : any, request : Request ) {
      return x.runWith(request).toPromise()
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
        add: async (body: unknown) => {
          const request = await br('data', domain)
          const r = await doRequest(data.add(body), request)
          return doFetch(r)
        },
        get: async (id: string) => {
          const request = await br('data', domain)
          const r = await doRequest(data.get(id), request)
          return doFetch(r)
        }
      }
    }
  }
}
