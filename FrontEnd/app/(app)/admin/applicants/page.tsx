"use client"

import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import React, { useState, useEffect } from 'react'
import styles from "./page.module.css"
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import { apiRequest } from '@/lib/api'

const Applicants = () => {
    const [applicants, setApplicants] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiRequest("/user/pending")
            .then(res => res.json())
            .then(data => setApplicants(Array.isArray(data) ? data : []))
            .catch(() => setApplicants([]))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

  return (
    <div className={styles.pageWrapper} >
      <h2 className={styles.pageTitle}>Applicants</h2>
      <AdminListDisplay arrayLength={applicants.length} message="No Applicants">
        <InfoTopBar stringOne='Name' stringTwo='Gender' stringThree='Date of Birth'/>
        {applicants.map((user) => (
          <InfoDisplayCard
            key={user.id}
            stringOne={`${user.first_name} ${user.surname}`}
            stringTwo={user.gender}
            dob={user.date_of_birth ? user.date_of_birth.substring(0, 10) : ""}
            route={`./applicants/details?userCode=${user.id}`}
          />
        ))}
      </AdminListDisplay>
    </div>
  )
}
export default Applicants
