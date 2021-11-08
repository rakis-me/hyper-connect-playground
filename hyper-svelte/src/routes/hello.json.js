import { fork } from 'hyper-connect'


export async function get () {
 
  const result = await fork('https://example.com')
  const text = await result.text()
  
  return {
    body: { hello: text}
  }
}