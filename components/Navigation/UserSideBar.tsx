import React from 'react'
import styles from "./Navigations.module.css"
import Link from 'next/link'
import RedirectBtn from '../buttons/RedirectBtn'

const UserSideBar = () => {
  return (
    <aside className={styles.sideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/user/discover' align='left' buttonText='Discover'/>
            <RedirectBtn targetUrl='/user/profile' align='left' buttonText='Profile'/>
            <RedirectBtn targetUrl='/user/actions' align='left' buttonText='Actions'/>
            <RedirectBtn targetUrl='/user/discover/liked' align='left' buttonText='Liked'/>
        </nav>
    </aside>
  )
}

export default UserSideBar