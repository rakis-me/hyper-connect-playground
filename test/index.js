const { connect } = require('connect-nodejs')

const hyper = connect(process.env.HYPER)()

hyper.data.get('foo')
  .then(console.log)
  