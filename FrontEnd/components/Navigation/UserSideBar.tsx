"use client"

import React, { useState, useEffect } from 'react'
import styles from "./Navigations.module.css"
import RedirectBtn from '../Buttons/RedirectBtn'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { clearUser, getUserId, getGender } from '@/lib/auth'

const UserSideBar = () => {
  const router = useRouter()
  const [actionsComplete, setActionsComplete] = useState(false)

  useEffect(() => {
    const checkActions = async () => {
      const userId = getUserId()
      const gender = getGender()
      if (!userId) return

      const profileRes = await apiRequest(`/marriage-profile/user/${userId}`)
      if (!profileRes.ok) return

      if (gender === "female") {
        const userRes = await apiRequest(`/user/${userId}`)
        if (!userRes.ok) return
        const user = await userRes.json()
        if (user.guardian_first_name && user.guardian_email) setActionsComplete(true)
      } else {
        setActionsComplete(true)
      }
    }
    checkActions()
  }, [])

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
    <aside className={styles.sideBar}>
        <h2 className={styles.sideBarHeading}>Community Match</h2>
        <nav className={styles.nav}>
            <RedirectBtn targetUrl='/user/discover' align='left' buttonText='Discover'/>
            <RedirectBtn targetUrl='/user/profile' align='left' buttonText='Profile'/>
            {actionsComplete
                ? <button className={styles.disabledNavBtn} disabled>Actions</button>
                : <RedirectBtn targetUrl='/user/actions' align='left' buttonText='Actions'/>
            }
            <RedirectBtn targetUrl='/user/discover/liked' align='left' buttonText='Liked'/>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </aside>
  )
}

export default UserSideBar
