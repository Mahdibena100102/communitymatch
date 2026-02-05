"use client"

import React, { useState } from 'react'
import { mockProfiles } from "../../data/mockProfiles";
import type { Profile } from "../../data/mockProfiles";
import styles from "./DiscoverComp.module.css"


const DisplayProfile = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const currentProfile: Profile = mockProfiles[currentIndex]

    const isFirst = currentIndex === 0

    const isLast = mockProfiles.length - 1;

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev -1,0))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev +1, mockProfiles.length - 1))
    }

  return (
    <div className={styles.displayProfileWrapper}>

        <div>
            <button className={styles.button} onClick={handlePrev}>Prev</button>
        </div>

        <div className={styles.profileCard} key={currentProfile.id} >
            <p>ID : {currentProfile.id} </p>
            <p>Age : {currentProfile.age} </p>
            <p>D.O.B : {currentProfile.dob} </p>
            <p>Height : {currentProfile.heightM} </p>
            <p>Weight : {currentProfile.weightKg} </p>
            <p>Profession : {currentProfile.profession} </p>
            <p>Ethnicity : {currentProfile.ethnicity} </p>
            <p>About : {currentProfile.about} </p>
            <p>Looking For : {currentProfile.lookingFor} </p>
        </div>

        <div>           
             <button className={styles.button} onClick={handleNext}>Next</button>
        </div>

    </div>
  )
}

export default DisplayProfile