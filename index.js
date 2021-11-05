import connect from 'hyper-connect'

const hyper = connect(process.env['HYPER'])()

const log = v => console.log(v)

// pure functions
const always = v => () => v
const constant = x => x

const add = doc => hyper.data.add(doc).then(res => res.ok ? doc : Promise.reject(res))
const cache = doc => hyper.cache.add(doc.id, doc).then(always(doc))

const isCached = id => hyper.cache.get(id)
  .then(result => result.ok === false ? Promise.reject(id) : result)

const read = id => hyper.data.get(id) 

 const deCache = id => hyper.cache.remove(id)
   .then(always(id), always(id))
   .then(hyper.data.remove)


// cacheAdd - Add to data and cache 
const cacheAdd = doc =>
  Promise.resolve(doc)
    .then(add)
    .then(cache)

// get - fallback to data if not in cache
const get = id => 
  Promise.resolve(id)
    .then(isCached)
    .then(constant, read)
    .catch(() => id)

// del - remove data in cache if exists and remove doc in data if exists
const del = id => deCache(id)

// callstack
async function main() {
  const results = await hyper.data.query({type: 'game'})
  console.log(results)
  
}

main()