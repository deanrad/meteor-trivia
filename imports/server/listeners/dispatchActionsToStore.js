import store from '../../store/store'
import dispatchedActions from '../streams/dispatchedActions'

dispatchedActions.subscribe(action => {
  store.dispatch(action)
})
