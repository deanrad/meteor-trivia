import './router'

import './subscribeProcessedActions'
import '/imports/client/listeners/dispatchServerActions'
import '/imports/client/listeners/dispatchClientActions'

import Actions from '/imports/store/actions'

window.log = console.log.bind(console)
window.Actions = Actions
