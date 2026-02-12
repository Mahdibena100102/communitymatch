"use client"

import React, { useState, useEffect } from 'react'
import { mockProfiles } from "../../data/mockProfiles";
import type { Profile } from "../../data/mockProfiles";
import styles from "./DiscoverComp.module.css"
import DecisionButtons from './DecisionButtons';


const DisplayProfile = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const [interested, setInterested] = useState<Profile[]>(()=>{
        try{
            const stored = localStorage.getItem("interestedProfiles")
            return stored ? JSON.parse(stored) : []
        } catch{
            return []
        }
    })

    const [pass, setPass] = useState<Profile[]>([])

    useEffect(()=>{
        localStorage.setItem("interestedProfiles", JSON.stringify(interested))
        console.log(interested)
    }
    ,[interested])

    const currentProfile: Profile = mockProfiles[currentIndex]

    const isFirst = currentIndex === 0

    const isLast = currentIndex === mockProfiles.length - 1;

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev -1,0))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev +1, mockProfiles.length - 1))
    }
    
    const handlePass = () => {
        if (!currentProfile) return        
        setPass((prev) => ([...prev, currentProfile]))
        mockProfiles.splice(currentIndex,1)

    }    

    const handleInterested = () => {
        if (!currentProfile) return;

        const exists = interested.some((profile) => profile.userCode === currentProfile.userCode)

        if (!exists) {
        setInterested((prev) => [...prev, currentProfile]);
        mockProfiles.splice(currentIndex,1)
        } 
        else {
            return
        }
    }
        
  return (
    <div className={styles.displayProfileWrapper}>

        <div>
            <button className={styles.button} disabled={isFirst} onClick={handlePrev}>Prev</button>
        </div>

        {currentProfile ? 
        <div className={styles.profileCard} key={currentProfile.userCode} >
            <p>Profile:{currentIndex+1}/{mockProfiles.length}</p>
            <p>ID : {currentProfile.userCode} </p>
            <p>Age : {currentProfile.age} </p>
            <p>D.O.B : {currentProfile.dob} </p>
            <p>Height : {currentProfile.heightM} </p>
            <p>Weight : {currentProfile.weightKg} </p>
            <p>Profession : {currentProfile.profession} </p>
            <p>Ethnicity : {currentProfile.ethnicity} </p>
            <p>About : {currentProfile.about} </p>
            <p>Looking For : {currentProfile.lookingFor} </p>
            <DecisionButtons onPass={handlePass} onInterested={handleInterested}/>
        </div>
        :   <div>
                <p>No Profiles</p>
            </div>

        }
        
        <div>           
             <button className={styles.button} disabled={isLast} onClick={handleNext}>Next</button>
        </div>

    </div>
  )
}

export default DisplayProfile