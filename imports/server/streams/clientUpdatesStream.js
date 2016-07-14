import incomingClientActions from './incomingClientActions'

export const sanitizePayload = (payload) => {
  return payload.updateIn(['game', 'questions'],
    qs => qs && qs.map(q => q.delete('correctAnswer')))
}

export default incomingClientActions.map(a => {
  return a.update('payload', sanitizePayload)
})
