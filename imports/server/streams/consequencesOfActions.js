import incomingClientActions from './incomingClientActions'
import Actions from '../../store/actions'

// eventually we will expand actions to their consequences in this module
export default incomingClientActions.map((a) => {
  if (a === Actions.resetAction) return a
  console.log('Action a mapped to [a]', a)
  return a
})
