import { fork } from 'connect'

async function main () {
  const result = await fork('http://example.com')
  const text = await result.text()

  console.log(text)
}

main()