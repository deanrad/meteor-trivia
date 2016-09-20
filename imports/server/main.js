/* eslint no-unused-vars:0 */

import { dispatchAction } from '../methods/server/dispatchAction'
import serverActions from './publications/serverActions'

import populateStoreFromMongo from './startup/populateStoreFromMongo'

import '/imports/server/listeners/dispatchConsequencesOfActions'
import '/imports/server/listeners/writeActionsToMongo'
