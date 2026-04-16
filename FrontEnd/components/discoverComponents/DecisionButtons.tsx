import React from 'react'
import styles from "./DiscoverComp.module.css"

type DecisionButtonsProps = {
    onPass: () => void
    onInterested: () => void
}

const DecisionButtons = ({onPass, onInterested}:DecisionButtonsProps) => {
  return (
    <div className={styles.decisionButtons}>
        <button className={styles.passBtn} onClick={onPass}>Pass</button>
        <button className={styles.interestedBtn} onClick={onInterested}>Interested</button>
    </div>
  )
}

export default DecisionButtons
