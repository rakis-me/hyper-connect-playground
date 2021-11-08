import { connect } from 'hyper-connect'

const hyper = connect(`${process.env.HYPER}`)

async function main () {
  const result = await hyper.data.add({id: 'beep5', type:'msg', text: 'boop'})

  console.log(result)
}

main()