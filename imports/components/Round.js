import React from 'react'

export const Round = ({ question, judged }) => {
  if (!question) return null

  let { prompt, choices } = question
  return (
    <div>
      Question {judged ? '(judged)' : '(open)'}: {prompt}

      <ol className='choices'>
      {choices && choices.map(choice => (<li key={choice}>{choice}</li>))}
      </ol>

    </div>
  )
}
