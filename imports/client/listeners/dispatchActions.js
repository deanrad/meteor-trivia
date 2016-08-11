import serverActionsStream from '../streams/serverActionsStream'
import store from '/imports/store/store'

serverActionsStream.addListener({
  next: (a) => {
    console.log('Updating client store with', a)
    store.dispatch(a)
  },
  error: () => {},
  complete: () => {}
})

window.store = store
