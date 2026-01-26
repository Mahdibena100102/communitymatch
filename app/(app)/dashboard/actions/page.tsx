"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import SelectFile from '@/components/Files/SelectFile'

const ActionPage = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className={styles.pageWrapper}>

      <div className={styles.uploadID}>
        <h2>Upload Identification</h2>
        <SelectFile file={file} onChange={setFile}/>
      </div>
      <div className={styles.profileCreation}>
        <h2>Create Marriage Profile</h2>
      </div>
    </div>
  )
}

export default ActionPage