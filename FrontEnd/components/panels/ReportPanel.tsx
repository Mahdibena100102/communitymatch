"use client"
import React from 'react'
import RedirectBtn from '../buttons/RedirectBtn'
import styles from "./panels.module.css"

type ReportPanelProps = {
  report: any
  reporter: any
  reported: any
}

const ReportPanel = ({ report, reporter, reported }: ReportPanelProps) => {
  return (
    <div className={styles.reportPanelWrapper}>
        <p>
          <span className={styles.label}>Report ID</span>
          {report?.id ? String(report.id).padStart(6, '0') : 'N/A'}
        </p>
        <div>
          <p>
            <span className={styles.label}>Reported By</span>
            {reporter ? `${reporter.first_name} ${reporter.surname}` : 'N/A'}
          </p>
          {reporter && <RedirectBtn targetUrl={`/admin/applicants/details?userCode=${report.reporter_id}&readOnly=true`} buttonText='View Profile' variant='adminButton'/>}
        </div>
        <div>
          <p>
            <span className={styles.label}>User Reported</span>
            {reported ? `${reported.first_name} ${reported.surname}` : 'N/A'}
          </p>
          {reported && <RedirectBtn targetUrl={`/admin/applicants/details?userCode=${report.reported_id}&readOnly=true`} buttonText='View Profile' variant='adminButton'/>}
        </div>
        <p className={styles.reportReason}>
          <span className={styles.label}>Report Reason</span>
          {report?.reason}
        </p>
    </div>
  )
}

export default ReportPanel
