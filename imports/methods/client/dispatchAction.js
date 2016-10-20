import { UniMethod } from 'meteor/deanius:uni-method'


export const dispatchAction = action => UniMethod.call('dispatchAction', action)

window.dispatchAction = dispatchAction
