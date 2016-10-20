import clientActionsStream from '../streams/clientActionsStream'
import store from '../../store/store'
import { dispatchAction } from '../../methods/client/dispatchAction'

// all but action.meta.optimistic === false or played locally
// are dispatched optimistically first
clientActionsStream
  .filter(a => !(a.meta && !a.meta.optimistic))
  .addListener({
    next: (a) => {
      console.log('Optimistically dispatching', a)
      store.dispatch(a)
    },
    error: () => {},
    complete: () => {}
  })

// send all actions to the server
clientActionsStream
  .addListener({
    next(a) {
      console.log(`Dispatching ${a.type} action to server`)
      dispatchAction(a)
    },
    error: () => {},
    complete: () => {}
  })
