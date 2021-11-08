import { connect } from 'hyper-connect'

const HYPER = 'cloud://xhpsy75h0ra7ejhhovpfvka3j9sbfy3q:uzIGdekP1zOuDE5EHIkFzjhcqJDECju-yL7DbcppsnvB7htFNApaLvKnN0Q2ixf9@cloud.hyper.io/app-dimgrey-ball-lightning'
const hyper = connect(HYPER)

async function main () {
  const result = await hyper.data.add({id: 'beep', type:'msg', text: 'boop'})
  console.log(result)
}

main()