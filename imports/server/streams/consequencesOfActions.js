import incomingClientActions from './incomingClientActions'

// eventually we will expand actions to their consequences in this module
export default incomingClientActions.map((a) => {
  console.log('Action a mapped to [a]', a)
  return a
})
