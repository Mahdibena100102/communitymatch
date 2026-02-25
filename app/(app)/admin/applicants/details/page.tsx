"use client"

import React from 'react'
import styles from "./page.module.css"
import DisplayUserPanel from '@/components/panels/DisplayUserPanel'
import { useSearchParams } from 'next/navigation'
import ApplicantDecisionButtons from "@/components/panels/ApplicantDecisionButtons"

const ApplicantDetails = () => {

  const searchParams = useSearchParams()
  const userCode = searchParams.get("userCode")

  console.log(userCode)

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.infoWrapper}>
        <DisplayUserPanel userCode={userCode}/>
        <ApplicantDecisionButtons/>
      </div>
    </div>
  )
}

export default ApplicantDetails