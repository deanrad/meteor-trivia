import { fromJS } from 'immutable'
import { pushNext } from './streams/incomingClientActions'

export const handleDispatch = (action) => {
  console.log(`Recieved ${action.type} from client, putting on stream..`)
  pushNext(fromJS(action))
}
