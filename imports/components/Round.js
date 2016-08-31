import React from 'react'
import Actions from '/imports/store/actions'
import { dispatchAction } from '/imports/methods/client/dispatchAction'

export const Round = ({ question, judged }) => {
  if (!question) return null

  let { prompt, choices } = question
  return (
    <div>
    Question {judged ? '(judged)' : '(open)'}: {prompt}

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
