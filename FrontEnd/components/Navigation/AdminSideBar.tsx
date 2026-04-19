"use client"

import React from 'react'
import styles from "./Navigations.module.css"
import RedirectBtn from '../Buttons/RedirectBtn'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { clearUser } from '@/lib/auth'

const AdminSideBar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await apiRequest("/logout", { method: "POST" })
    } catch (err) {
      console.log(err)
    }
    clearUser()
    router.push("/login")
  }

  return (
    <aside className={styles.adminSideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/admin/dashboard' align='left' buttonText='Dashboard' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/users' align='left' buttonText='Users' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/applicants' align='left' buttonText='Applicants' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/matches' align='left' buttonText='Matches' variant='adminSideButton'/>
            <RedirectBtn targetUrl='/admin/reports' align='left' buttonText='Reports' variant='adminSideButton'/>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </aside>
  )
}

export default AdminSideBar
