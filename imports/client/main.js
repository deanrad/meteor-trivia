import './routes'

import './subscribeServerActions'
import './listeners/dispatchActions'
import './redundantlySubscribeToGameUpdates'

import '../methods/client/dispatchAction'

import Actions from '/imports/store/actions'

window.log = console.log.bind(console)
window.Actions = Actions
