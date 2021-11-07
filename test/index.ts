import { connect } from 'hyper-connect'

const hyper = connect(`${process.env.HYPER}`)()

interface Game {
  id: string,
  type: string,
  name: string
}

async function main()  {
  //const doc = await hyper.data.get('foo')
  const result = await hyper.data.add<Game>({id: 'game-1', type: 'game', name: 'Mario'})
  console.log(result)
}

main()

