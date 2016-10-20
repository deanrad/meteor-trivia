import xs from 'xstream'

const stream = xs.create()

export default stream
export const dispatchAction = (action) => stream.shamefullySendNext(action)
