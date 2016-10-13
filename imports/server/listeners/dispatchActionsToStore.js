import store from '../../store/store'
import dispatchedActions from '../streams/dispatchedActions'

dispatchedActions.subscribe(action => {
  // TODO exception handling, proper error propogation to client
  store.dispatch(action)
})
