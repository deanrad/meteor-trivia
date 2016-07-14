// import routes from '/imports/routes'
import routes from './routes'

import { dispatchAction } from '../methods/dispatchAction'

import subscribeServerActions from './subscribeServerActions'
import serverActionsReceiver from './serverActionsReceiver'

window.dispatchAction = dispatchAction
window.log = console.log.bind(console)
