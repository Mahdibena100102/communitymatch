"use client"

import React, { useState, useEffect } from 'react'
import AdminDashboardCard from "./AdminDashboardCard"
import styles from "./Cards.module.css"
import { apiRequest } from '@/lib/api'

const AdminDashboardCards = () => {
  const [pendingCount, setPendingCount] = useState(0)
  const [matchesCount, setMatchesCount] = useState(0)
  const [reportsCount, setReportsCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [pendingRes, matchesRes, reportsRes] = await Promise.all([
          apiRequest("/user/pending"),
          apiRequest("/match/mosque"),
          apiRequest("/report")
        ])
        const pending = pendingRes.ok ? await pendingRes.json() : []
        const matches = matchesRes.ok ? await matchesRes.json() : []
        const reports = reportsRes.ok ? await reportsRes.json() : []
        setPendingCount(Array.isArray(pending) ? pending.length : 0)
        setMatchesCount(Array.isArray(matches) ? matches.length : 0)
        setReportsCount(Array.isArray(reports) ? reports.length : 0)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCounts()
  }, [])

  return (
    <div className={styles.adminDashboardCardsWrapper}>
        <AdminDashboardCard heading='Pending Verfication' arrayLength={pendingCount} route='/admin/applicants'/>
        <AdminDashboardCard heading='New Matches' arrayLength={matchesCount} route='/admin/matches'/>
        <AdminDashboardCard heading='New Users Reported' arrayLength={reportsCount} route='/admin/reports'/>
    </div>
  )
}

export default AdminDashboardCards
