const { connect } = require('hyper-connect')

const hyper = connect(process.env.HYPER)()

hyper.data.add({id: 'game-2', type: 'game', name: 'Donkey Kong'})
  .then(res => console.log(res))