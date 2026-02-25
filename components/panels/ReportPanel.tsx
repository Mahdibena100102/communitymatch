"use client"
import React, { useState } from 'react'
import { mockProfiles } from '@/data/mockProfiles'
import RedirectBtn from '../buttons/RedirectBtn'
import styles from "./panels.module.css"

const ReportPanel = () => { 
    const [reportID, setReportID] = useState("0001")
    const [reporter, setReporter] = useState("USR001")
    const [reported, setReported] = useState("USR002")

  return (
    <div className={styles.reportPanelWrapper}>
        <p>Report ID: {reportID}</p>
        <div>
          <p>Reported By: mahdi benadjal</p><RedirectBtn targetUrl={`/admin/applicants/details?userCode=${reporter}`} buttonText='View Profile' variant='adminButton'/>
        </div>
        <div>
          <p>User Reported: ismael benadjal</p><RedirectBtn targetUrl={`/admin/applicants/details?userCode=${reported}`} buttonText='View Profile' variant='adminButton'/>
        </div>
        <p>Reported Reason: inappropriate content</p>
    </div>
  )
}

export default ReportPanel