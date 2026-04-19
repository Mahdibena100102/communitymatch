"use client"

import React, { useState, useEffect, Suspense } from 'react'
import styles from "./page.module.css"
import DisplayUserPanel from '@/components/panels/DisplayUserPanel'
import { useSearchParams, useRouter } from 'next/navigation'
import ApplicantDecisionButtons from "@/components/panels/ApplicantDecisionButtons"
import { apiRequest } from '@/lib/api'

const ApplicantDetailsInner = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userCode = searchParams.get("userCode")
  const readOnly = searchParams.get("readOnly") === "true"

  const [user, setUser] = useState<any>(null)
  const [marriageProfile, setMarriageProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!userCode) return

    const fetchData = async () => {
      try {
        const [userRes, mpRes] = await Promise.all([
          apiRequest(`/user/${userCode}`),
          apiRequest(`/marriage-profile/user/${userCode}`)
        ])
        const userData = await userRes.json()
        const mpData = mpRes.ok ? await mpRes.json() : null
        setUser(userData)
        setMarriageProfile(mpData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userCode])

  const handleDelete = async () => {
    if (!userCode) return
    setDeleting(true)
    try {
      await apiRequest(`/user/${userCode}`, { method: "DELETE" })
      router.push("/admin/users")
    } catch (err) {
      console.log(err)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Applicant Details</h2>
      <div className={styles.infoWrapper}>
        <DisplayUserPanel user={user} marriageProfile={marriageProfile}/>
        {!readOnly && <ApplicantDecisionButtons userId={userCode}/>}
        {readOnly && (
          <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <button onClick={handleDelete} disabled={deleting} style={{padding: '10px 50px',border: 'none', cursor: 'pointer', fontSize: '0.875rem',backgroundColor: 'var(--background-colour-grey)'}}>
              {deleting ? 'Deleting...' : 'Delete User'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ApplicantDetails() {
  return (
    <Suspense>
      <ApplicantDetailsInner />
    </Suspense>
  )
}

