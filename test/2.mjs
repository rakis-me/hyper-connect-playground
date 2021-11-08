import hyperConnect from 'hyper-connect'

const { fork } = hyperConnect

async function main() {
  const result = await fork('https://example.com')
  console.log(
    await result.text()
  )
}

main()
