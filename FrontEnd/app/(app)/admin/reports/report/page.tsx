"use client"

import ReportPanel from '@/components/panels/ReportPanel'
import React, { useState, useEffect, Suspense } from 'react'
import styles from "./page.module.css"
import { useSearchParams, useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'

const ReportPageInner = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reportId = searchParams.get("reportId")

  const [report, setReport] = useState<any>(null)
  const [reporter, setReporter] = useState<any>(null)
  const [reported, setReported] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState(false)

  useEffect(() => {
    if (!reportId) return

    const fetchReport = async () => {
      try {
        const res = await apiRequest("/report")
        const reports = res.ok ? await res.json() : []
        const found = reports.find((r: any) => r.id === Number(reportId))

        if (found) {
          setReport(found)
          const [rprRes, rpdRes] = await Promise.all([
            apiRequest(`/user/${found.reporter_id}`),
            apiRequest(`/user/${found.reported_id}`)
          ])
          setReporter(rprRes.ok ? await rprRes.json() : null)
          setReported(rpdRes.ok ? await rpdRes.json() : null)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId])

  const handleIgnore = async () => {
    if (!reportId) return
    setActing(true)
    try {
      await apiRequest(`/report/${reportId}`, { method: "DELETE" })
      router.push("/admin/reports")
    } catch (err) {
      console.log(err)
    } finally {
      setActing(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!report) return
    setActing(true)
    try {
      await apiRequest(`/user/${report.reported_id}`, { method: "DELETE" })
      await apiRequest(`/report/${reportId}`, { method: "DELETE" })
      router.push("/admin/reports")
    } catch (err) {
      console.log(err)
    } finally {
      setActing(false)
    }
  }

  if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>
  if (!report) return <div className={styles.pageWrapper}><p>Report not found.</p></div>

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Outstanding Report</h2>
      <ReportPanel report={report} reporter={reporter} reported={reported}/>
      <div className={styles.actionBar}>
        <button className={styles.ignoreBtn} onClick={handleIgnore} disabled={acting}>Ignore Report</button>
        <button className={styles.deleteBtn} onClick={handleDeleteUser} disabled={acting}>Delete Reported User</button>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense>
      <ReportPageInner />
    </Suspense>
  )
}
