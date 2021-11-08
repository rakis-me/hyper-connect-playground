import { connect } from 'hyper-connect'

const hyper = connect(process.env.HYPER as string)

interface Msg {
  id: string,
  type: string,
  text: string
}

async function main () {
  const results = await hyper.data.list<Msg>()

  console.log(results)
}

main()