import store from '../../store/store'
import { dispatchedActions } from '../methods/dispatchAction'

dispatchedActions.subscribe(action => {
  // TODO exception handling, proper error propogation to client
  console.log('dispatching to store')
  store.dispatch(action)
})
