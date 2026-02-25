"use client"
import React from 'react'
import styles from "./panels.module.css"
import { mockProfiles } from '@/data/mockProfiles'
import ApplicantDecisionButtons from './ApplicantDecisionButtons'

type DisplayUserPanelProps = {
    userCode: string | null
}

const DisplayUserPanel = ({userCode}:DisplayUserPanelProps) => {
  const profile = mockProfiles.find(user => user.userCode === userCode)

  return (
    <div className={styles.userPanelWrapper}>
        {(!profile) ? <p>No Profile Found</p>:         
        <>
        <div className={styles.scrollable}>
            <div className={styles.userPanelRow}>
                <p>Name: {profile.firstName} {profile.surname}</p>
                <p>D.O.B: {profile.dob}</p>
            </div> 
            <div className={styles.userPanelRow}>
                <p>Age: {profile.age} </p>
                <p>Gender: {profile.gender}</p>
            </div> 
            <div className={styles.userPanelRow}>
                <p>Height: {profile.heightM}</p>
                <p>Weight: {profile.weightKg}</p>
            </div>
            <div className={styles.userPanelRow}>
                <p>Profession: {profile.profession}</p>
                <p>Ethnicity: {profile.ethnicity}</p>
            </div> 
            <div className={styles.userPanelRow}>
                <p>Guardian Name: {(profile.gender === "female") ? `${profile.guardianName} ${profile.guardianSurname}` : "N/A"}</p>
                <p>Guardian Email: {(profile.gender === "female") ? profile.guardianEmail : "N/A"}</p>
                <p>Guardian Number: {(profile.gender === "female") ? profile.guardianNumber : "N/A"}</p>
            </div> 
            <p className={styles.userPanelRow}>About: {profile.about}</p>
            <p className={styles.userPanelRow}>Looking For: {profile.lookingFor}</p>
        </div>            
        </>
        }

    </div>
  )
}

export default DisplayUserPanel