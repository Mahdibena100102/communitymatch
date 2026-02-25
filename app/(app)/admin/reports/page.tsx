import React from 'react'
import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import styles from "./page.module.css"
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'

import { mockProfiles } from '@/data/mockProfiles'



const Reports = () => {

  return (
    <div className={styles.pageWrapper} >
      <AdminListDisplay arrayLength={mockProfiles.length} message="No Reports">
        <InfoTopBar stringOne='Reported User' stringTwo='Reportee' stringThree='Date'/>
          {mockProfiles.map((profile) => (
          <InfoDisplayCard key={profile.userCode} stringOne={`${profile.firstName} ${profile.surname}`} stringTwo='Reportee Name' dob={profile.dob} route={`./reports/report?userCode=${profile.userCode}`}/>
        ))}
      </AdminListDisplay>
    </div>  )
}

export default Reports