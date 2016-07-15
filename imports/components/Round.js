import React from 'react'

export const Round = ({ question, judged }) => {
  if (!question) return null

  return (
    <div>
      Question {judged ? '(judged)' : '(open)'}: {question.prompt}
    </div>
  )
}
