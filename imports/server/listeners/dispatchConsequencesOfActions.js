import store from '/imports/store/store'
import consequencesOfActions from '../streams/consequencesOfActions'

consequencesOfActions.subscribe(action => {
  store.dispatch(action)
})
