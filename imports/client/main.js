/* eslint no-unused-vars:0 */
import routes from './routes'

import { dispatchAction } from '../methods/dispatchAction'

import subscribeServerActions from './subscribeServerActions'
import serverActionsReceiver from './serverActionsReceiver'
import redundantlySubscribeToGameUpdates from './redundantlySubscribeToGameUpdates'

window.dispatchAction = dispatchAction
window.log = console.log.bind(console)
