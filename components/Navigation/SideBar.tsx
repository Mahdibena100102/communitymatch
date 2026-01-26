import React from 'react'
import styles from "./Navigations.module.css"
import Link from 'next/link'
import RedirectBtn from '../Buttons/RedirectBtn'

const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/dashboard/discover' align='left' buttonText='Discover'/>
            <RedirectBtn targetUrl='/dashboard/profile' align='left' buttonText='Profile'/>
            <RedirectBtn targetUrl='/dashboard/actions' align='left' buttonText='Actions'/>
        </nav>
    </aside>
  )
}

export default SideBar