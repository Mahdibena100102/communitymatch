"use client"

import React, { useState, useEffect } from 'react'
import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import styles from "./page.module.css"
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'
import { apiRequest } from '@/lib/api'

const Reports = () => {
  const [reports, setReports] = useState<any[]>([])
  const [userMap, setUserMap] = useState<Record<number, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiRequest("/report")
        const data = res.ok ? await res.json() : []
        setReports(Array.isArray(data) ? data : [])

        const ids: number[] = []
        data.forEach((r: any) => {
          ids.push(r.reporter_id)
          ids.push(r.reported_id)
        })
        const unique = [...new Set(ids)]
        const userEntries = await Promise.all(
          unique.map(async (id) => {
            const r = await apiRequest(`/user/${id}`)
            const u = r.ok ? await r.json() : null
            return [id, u]
          })
        )
        setUserMap(Object.fromEntries(userEntries))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const userName = (id: number) => {
    const u = userMap[id]
    return u ? `${u.first_name} ${u.surname}` : `User ${id}`
  }

  if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Outstanding Reports</h2>
      <AdminListDisplay arrayLength={reports.length} message="No Reports">
        <InfoTopBar stringOne='Reporter' stringTwo='Reported User' stringThree='Reason'/>
        {reports.map((report) => (
          <InfoDisplayCard
            key={report.id}
            stringOne={userName(report.reporter_id)}
            stringTwo={userName(report.reported_id)}
            dob={report.reason || ""}
            route={`/admin/reports/report?reportId=${report.id}`}
          />
        ))}
      </AdminListDisplay>
    </div>
  )
}

export default Reports
