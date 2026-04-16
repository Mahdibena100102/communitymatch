"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from "./panels.module.css"
import { apiRequest } from '@/lib/api'

type ApplicantDecisionButtonsProps = {
  userId: string | null
}

const ApplicantDecisionButtons = ({userId}: ApplicantDecisionButtonsProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleReject = async () => {
    if (!userId) return
    setLoading(true)
    try {
      await apiRequest(`/user/${userId}/reject`, { method: "PUT" })
      router.push("/admin/applicants")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApproved = async () => {
    if (!userId) return
    setLoading(true)
    try {
      await apiRequest(`/user/${userId}/approve`, { method: "PUT" })
      router.push("/admin/applicants")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.decisionButtonWrapper}>
        <button className={styles.buttonStyles} onClick={handleReject} disabled={loading}>Reject</button>
        <button className={styles.buttonStylesApprove} onClick={handleApproved} disabled={loading}>Approve</button>
    </div>
  )
}

export default ApplicantDecisionButtons
