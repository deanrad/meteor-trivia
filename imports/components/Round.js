import React from 'react'

export const Round = ({ question, judged }) => {
  if (!question) return null

  let { prompt, choices } = question
  return (
    <div>
    Question {judged ? '(judged)' : '(open)'}: {prompt}

    <div className="voting">
      {choices && choices.map(choice => (<button key={choice} className="vote">{choice}</button>))}

    </div>
    </div>
  )
}
