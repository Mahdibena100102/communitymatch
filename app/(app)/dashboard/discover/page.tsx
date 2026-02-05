import DisplayProfile from '@/components/discoverComponents/DisplayProfile'
import React from 'react'
import styles from "./page.module.css"

const DiscoverPage = () => {
  return (
    <div className={styles.pageWrapper}>
          <DisplayProfile/>
    </div>
  )
}

export default DiscoverPage