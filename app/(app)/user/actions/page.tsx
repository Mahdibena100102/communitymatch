"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import SelectFile from '@/components/UploadFileCard/SelectFile'
import CreateProfileCard from '@/components/Cards/CreateProfileCard'

const ActionPage = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className={styles.pageWrapper}>
{/* 
      <div className={styles.uploadID}>
        <h2>Upload Identification</h2>
        <SelectFile file={file} onChange={setFile}/>
      </div> */}
      <div className={styles.profileCreation}>
        <CreateProfileCard/>
      </div>
    </div>
  )
}

export default ActionPage