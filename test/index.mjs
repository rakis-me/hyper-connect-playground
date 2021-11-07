import { connect } from 'hyper-connect'

const hyper = connect(process.env.HYPER)()

const result = await hyper.data.get('game-1')
console.log(result)
const result2 = await hyper.data.get('game-2')
console.log(result2)