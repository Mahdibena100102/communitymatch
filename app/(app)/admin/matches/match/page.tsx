import React from 'react'
import styles from "./page.module.css"
import MatchDetailPanel from '@/components/panels/MatchDetailPanel'

const Match = () => {
  return (
    <div className={styles.pageWrapper}>
        <MatchDetailPanel/>
    </div>
  )
}

export default Match