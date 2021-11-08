import { connect } from 'hyper-connect'

const hyper = connect(`${process.env['HYPER']}`)

export async function get () {
 
  const result = await hyper.data.add({id: 'beep7', type: 'msg'})
  return {
    body: result 
  }
}