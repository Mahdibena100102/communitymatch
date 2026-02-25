import React from 'react'
import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import styles from "./page.module.css"
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'
import { mockProfiles } from '@/data/mockProfiles'



const Matches = () => {

  return (
    <div className={styles.pageWrapper} >
      <AdminListDisplay arrayLength={mockProfiles.length} message="No Matches">
        <InfoTopBar stringOne='Male Name' stringTwo='Female Name' stringThree='Date'/>
        {mockProfiles.map((profile) => (
          <InfoDisplayCard key={profile.userCode} stringOne={`${profile.firstName} ${profile.surname}`} stringTwo='Pair Name' dob={profile.dob} route='/admin/matches/match'/>
        ))}
      </AdminListDisplay>
    </div>  )
}

export default Matches