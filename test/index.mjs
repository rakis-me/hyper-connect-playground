import { connect } from 'connect-nodejs'

const hyper = connect(process.env.HYPER)()

const result = await hyper.data.get('foo')
console.log(result)
