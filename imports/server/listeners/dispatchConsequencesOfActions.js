import store from '../../store/store'
import consequencesOfActions from '../streams/consequencesOfActions'

consequencesOfActions.subscribe(action => {
  store.dispatch(action)
})
