import { Request } from 'node-fetch'

const service = 'data'

export const add = (body: any) => (hyper : Function) => hyper({ service, method: 'POST', body })