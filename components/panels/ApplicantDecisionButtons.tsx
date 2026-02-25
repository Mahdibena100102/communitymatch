import React from 'react'
import Link from 'next/link'
import styles from "./panels.module.css"


const DecisionButtons = () => {

    const handleReject = () => {
    console.log("Rejected")
  }
 
  const handleApproved = () => {
    console.log("Approved")
  }
  return (
    <div className={styles.decisionButtonWrapper}>
        <button className={styles.buttonStyles} onClick={handleReject}>Reject</button>
        <button className={styles.buttonStyles} onClick={handleApproved}>Approve</button>
    </div>
  )
}

export default DecisionButtons