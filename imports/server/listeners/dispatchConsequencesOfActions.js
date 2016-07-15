import store from '/imports/store/store'

import consequencesOfActions from '../streams/consequencesOfActions'

consequencesOfActions.subscribe(action => {
  console.log('applying to store:', action.toJS())
  store.dispatch(action.toJS())
})
