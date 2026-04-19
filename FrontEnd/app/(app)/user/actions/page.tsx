"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import CreateProfileCard from '@/components/Cards/CreateProfileCard'

const ActionPage = () => {

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Actions</h2>
      <div className={styles.profileCreation}>
        <CreateProfileCard/>
      </div>
    </div>
  )
}

export default ActionPage


