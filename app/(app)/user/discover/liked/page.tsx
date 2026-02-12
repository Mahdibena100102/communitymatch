"use client"

import React, { useState, useEffect } from 'react'
import type { Profile } from '@/data/mockProfiles'
import styles from "./page.module.css"



const LikedProfiles = () => {

    const [interested, setInterested] = useState<Profile[]>(()=>{
        try{
            const stored = localStorage.getItem("interestedProfiles")
            return stored ? JSON.parse(stored) : []
        } catch{
            return []
        }
    })

  useEffect(()=>{
    localStorage.setItem("interestedProfiles",JSON.stringify(interested))
  },[interested])

  const handleRemove = (profile: Profile) => {
    const updated = interested.filter((pro)=> pro.userCode !== profile.userCode)
    setInterested(updated)
  } 

  return (
    <div className={styles.pageWrapper}>
      <div className={(interested.length === 0) ? styles.cardWrapperEmpty : styles.cardWrapper}>
      {(interested.length === 0) ? <p>NO PROFILES!</p> : interested.map((profile)=>{
        return (
          <div className={styles.profileWrapper} key={profile.userCode}>
            <p>Age: {profile.age}</p>
            <p>D.O.B: {profile.dob}</p>
            <p>Ethnicity: {profile.ethnicity}</p>
            <button className={styles.delete} onClick={()=> handleRemove(profile)}>X</button>
          </div>
          )}
        )
      }
      </div>
    </div>
  )
}

export default LikedProfiles