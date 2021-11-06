import { connect } from 'connect-nodejs'

const hyper = connect(`${process.env.HYPER}`)()

async function main()  {
  const doc = await hyper.data.get('foo')
  console.log(doc)
}

main()

