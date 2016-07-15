import incomingClientActions from './incomingClientActions'
import actionToConsequences from '../mappers/actionToConsequences'

// eventually we will expand actions to their consequences in this module
export default incomingClientActions.map(actionToConsequences)
