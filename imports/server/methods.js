import incomingClientActions from './streams/incomingClientActions'

export const handleDispatch = (action) => {
  console.log(`Recieved ${action.type} from client, putting on stream..`)
  incomingClientActions.shamefullySendNext(action)
}
