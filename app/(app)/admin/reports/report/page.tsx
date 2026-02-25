import ReportPanel from '@/components/panels/ReportPanel'
import React from 'react'
import styles from "./page.module.css"

const page = () => {
  return (
    <div className={styles.pageWrapper}>
      <ReportPanel/>
    </div>
  )
}

export default page