import fetch, { Request } from 'node-fetch'
import { connect } from 'connect-nodejs'

globalThis.fetch = fetch 
globalThis.Request = Request

const s = "cloud://xmof48kiojxbsbpxgfkda1kl4o3jy79i:nHb1PaFaOy9h59EWGq_Ab-qjAHPilcrcQ4mFw9jVDv9I97uAPxQajERc7r7iAtAg@cloud.hyper.io/app-aquamarine-snow"

const hyper = connect(s)()

//console.log(hyper)
//const result = await hyper.data.add({id: 'foo', type: 'bar'})
const result = await hyper.data.get('foo')
console.log(result)