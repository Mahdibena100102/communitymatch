import React from 'react'
import Link from 'next/link'

type DecisionButtonsProps = {
    onPass: () => void
    onInterested: () => void

}

const DecisionButtons = ({onPass, onInterested}:DecisionButtonsProps) => {
  return (
    <div>
        <button onClick={onPass}>Pass</button>
        <button onClick={onInterested}>Interested</button>
    </div>
  )
}

export default DecisionButtons