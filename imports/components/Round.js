import React from 'react'
import { dispatchAction } from '../methods/client/dispatchAction'
import Actions from '../store/actions'

export const Round = ({ question, outcome }) => {
  if (!question) return null

  let { prompt, choices } = question
  return (
    <div>
    Question ({outcome || 'open'}): {prompt}

    <div className="voting">
      {choices.map(choice => (
        <button
          key={choice}
          onClick={() => dispatchAction(Actions.Round.respond(choice))}
          className="vote">{choice}</button>)
      )}

    </div>
    </div>
  )
}
