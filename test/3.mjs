import {fork} from 'connect'

async function main() {
  const result = await fork('https://example.com')
  console.log(
    await result.text()
  )
}

main()
