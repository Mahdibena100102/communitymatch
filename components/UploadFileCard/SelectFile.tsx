"use client"

import React from 'react'
import { useState } from 'react'
import styles from "./Files.module.css"


type SelectFileProps = {
    label?: string
    file: File | null
    onChange: (file:File | null) => void
    accept?: string
}


const SelectFile = ({label="Select File", file, onChange, accept}: SelectFileProps) => {

  return (
    <div>
        <label htmlFor="selectFile" className={styles.selectButton}>{label}</label>
        <input
            id='selectFile'
            type="file" 
            onChange={(e)=> onChange(e.target.files?.[0] ?? null)}
        hidden/>
        {file && <p>Selected: {file.name}</p>}
    </div>
  )
}

export default SelectFile