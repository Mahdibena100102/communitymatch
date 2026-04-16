import React from 'react'
import styles from "./panels.module.css"

type MatchDetailPanelProps = {
  maleUser: any
  femaleUser: any
}

const MatchDetailPanel = ({ maleUser, femaleUser }: MatchDetailPanelProps) => {
  return (
    <div className={styles.MatchPanelWrapper}>
        <div className={styles.matchBrotherDetailsCard}>
            <p><span className={styles.label}>Brother Name</span>{maleUser ? `${maleUser.first_name} ${maleUser.surname}` : 'N/A'}</p>
            <p className={styles.label}>Contact Details</p>
            <p>{maleUser?.email || 'N/A'}</p>
            <p>{maleUser?.phone_number || 'N/A'}</p>
        </div>
        <div className={styles.matchSisterDetailsCard}>
            <p><span className={styles.label}>Sister Name</span>{femaleUser ? `${femaleUser.first_name} ${femaleUser.surname}` : 'N/A'}</p>
            <p className={styles.label}>Contact Details</p>
            <p>{femaleUser?.email || 'N/A'}</p>
            <p>{femaleUser?.phone_number || 'N/A'}</p>
            <p className={styles.label}>Guardian Contact Details</p>
            <p>{femaleUser?.guardian_email || 'N/A'}</p>
            <p>{femaleUser?.guardian_phone_number || 'N/A'}</p>
        </div>
    </div>
  )
}

export default MatchDetailPanel
