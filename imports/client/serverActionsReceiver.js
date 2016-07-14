import serverActionsStream from './streams/serverActionsStream'
import store from '../store/store'

serverActionsStream.addListener({
  next: (a) => console.log('TODO update store with', a),
  error: () => {},
  complete: () => {}
})
