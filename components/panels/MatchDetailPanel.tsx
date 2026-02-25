import React from 'react'
import styles from "./panels.module.css"

const MatchDetailPanel = () => {
  return (
    <div className={styles.MatchPanelWrapper}>
        <div className={styles.matchBrotherDetailsCard}>
            <p>Brother Name: Mahdi</p>
            <div>
                <p>Contact Details:</p>
                <p>email@email.com</p>
                <p>07305417564</p>
            </div>
        </div>
        <div className={styles.matchSisterDetailsCard}>

            <p>Sister Name: Mahdi</p>
            <div>
                <p>Contact Details:</p>
                <p>email@email.com</p>
                <p>07305417564</p>
            </div>

            <div>
                <p>Guardian Contact Details:</p>
                <p>email@email.com</p>
                <p>07305417564</p>
            </div>

        </div>
    </div>
  )
}

export default MatchDetailPanel