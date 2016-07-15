import consequencesOfActions from './consequencesOfActions'

export const sanitizePayload = (payload) => {
  return payload && payload.updateIn(['game', 'questions'],
    qs => qs && qs.map(q => q.delete('correctAnswer')))
}

export default consequencesOfActions.map(a => {
  return a.update('payload', sanitizePayload)
})
