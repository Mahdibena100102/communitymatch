"use client"
import React from 'react'
import styles from "./panels.module.css"

type DisplayUserPanelProps = {
    user: any
    marriageProfile?: any
}

const DisplayUserPanel = ({user, marriageProfile}: DisplayUserPanelProps) => {

  if (!user) return <div className={styles.userPanelWrapper}><p>No Profile Found</p></div>

  const calcAge = (dob: string) => {
    if (!dob) return "N/A"
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age
  }

  return (
    <div className={styles.userPanelWrapper}>
        <div className={styles.scrollable}>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Name</span>{user.first_name} {user.surname}</p>
                <p><span className={styles.label}>Date of Birth</span>{user.date_of_birth ? user.date_of_birth.substring(0, 10) : "N/A"}</p>
            </div>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Age</span>{calcAge(user.date_of_birth)}</p>
                <p><span className={styles.label}>Gender</span>{user.gender}</p>
            </div>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Email</span>{user.email}</p>
                <p><span className={styles.label}>Phone</span>{user.phone_number}</p>
            </div>
            {marriageProfile && <>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Height</span>{marriageProfile.height}cm</p>
                <p><span className={styles.label}>Weight</span>{marriageProfile.weight}kg</p>
            </div>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Profession</span>{marriageProfile.profession}</p>
                <p><span className={styles.label}>Ethnicity</span>{marriageProfile.ethnicity}</p>
            </div>
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Education</span>{marriageProfile.education}</p>
                <p><span className={styles.label}>Living Arrangement</span>{marriageProfile.living_arrangment}</p>
            </div>
            </>}
            <div className={styles.userPanelRow}>
                <p><span className={styles.label}>Guardian Name</span>{user.gender === "female" ? `${user.guardian_first_name || ""} ${user.guardian_surname || ""}`.trim() || "N/A" : "N/A"}</p>
                <p><span className={styles.label}>Guardian Email</span>{user.gender === "female" ? user.guardian_email || "N/A" : "N/A"}</p>
                <p><span className={styles.label}>Guardian Phone</span>{user.gender === "female" ? user.guardian_phone_number || "N/A" : "N/A"}</p>
            </div>
            {marriageProfile && <>
            <div className={styles.userPanelRowFull}>
                <p className={styles.label}>About Me</p>
                <p>{marriageProfile.about_me}</p>
            </div>
            <div className={styles.userPanelRowFull}>
                <p className={styles.label}>Looking For</p>
                <p>{marriageProfile.looking_for}</p>
            </div>
            </>}
        </div>
    </div>
  )
}

export default DisplayUserPanel
