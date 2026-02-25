import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import React from 'react'
import styles from "./page.module.css"
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import { mockProfiles } from '@/data/mockProfiles'



const Applicants = () => {
  return (
    <div className={styles.pageWrapper} >
      <AdminListDisplay arrayLength={mockProfiles.length} message="No Applicants">
        <InfoTopBar stringOne='Name' stringTwo='Status' stringThree='Last Updated'/>
        {mockProfiles.map((profile) => (
          <InfoDisplayCard key={profile.userCode} stringOne={`${profile.firstName} ${profile.userCode}`} stringTwo='status' dob={profile.dob} route={`./applicants/details?userCode=${profile.userCode}`}/>
        ))}
      </AdminListDisplay>
    </div>
  )
}
export default Applicants
