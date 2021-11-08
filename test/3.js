const { connect } = require('hyper-connect')

const hyper = connect(`${process.env.HYPER}`)

async function main() {
  const result = await hyper.data.add({id: 'beep6', type:'msg', text: 'boop'})
  console.log(result)
}

main()
