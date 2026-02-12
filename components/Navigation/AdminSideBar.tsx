import React from 'react'
import styles from "./Navigations.module.css"
import Link from 'next/link'
import RedirectBtn from '../Buttons/RedirectBtn'

const AdminSideBar = () => {
  return (
    <aside className={styles.sideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/admin' align='left' buttonText='Dashboard'/>
            <RedirectBtn targetUrl='/admin' align='left' buttonText='Applicants'/>
            <RedirectBtn targetUrl='/admin' align='left' buttonText='Matches'/>
            <RedirectBtn targetUrl='/admin' align='left' buttonText='Reports'/>
        </nav>
    </aside>
  )
}

export default AdminSideBar