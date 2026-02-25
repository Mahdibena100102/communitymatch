import React from 'react'
import styles from "./Navigations.module.css"
import Link from 'next/link'
import RedirectBtn from '../buttons/RedirectBtn'

const AdminSideBar = () => {
  return (
    <aside className={styles.adminSideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/admin' align='left' buttonText='Dashboard' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/applicants' align='left' buttonText='Applicants' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/matches' align='left' buttonText='Matches' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/reports' align='left' buttonText='Reports' variant='adminSideButton'/>
        </nav>
    </aside>
  )
}

export default AdminSideBar