<h1 align="center">⚡️hyper-connect⚡️</h1>
<p align="center">A connection client for hyper using nodejs</p>

---

hyper-connect is a sdk for [hyper](https://hyper.io), to make it easy to connect, query and manage data with hyper services.

> [hyper](https://hyper.io) is an API service that provides access to primitive application services like data, cache, search, storage, and queues. Instance access to secure and scalable infrastructure with just a few lines of code.

## Getting Started

``` sh
npm install hyper-connect
```

## example

``` js
import { connect } from 'hyper-connect'

const hyper = connect(HYPER, 'default')

const results = await hyper.data.query({
  type: 'game',
  company: 'nintendo',
  name: { $gte: 'mario' },
  published: { $lt: '1990' }
})

console.log(results.docs)
```





