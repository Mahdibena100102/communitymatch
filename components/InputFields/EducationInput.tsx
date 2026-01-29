import React from 'react'
import styles from "./InputFields.module.css"

type EducationInputProps = {
  value: string
  onChange: (value: string) => void
}

const EducationInput = ({value, onChange}: EducationInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor="education">Education</label>
        <select 
            className={styles.field}
            id="education"
            value={value} 
            onChange={(e)=> onChange(e.target.value)}
            required
        >
            <option value="">Select education level</option>
            <option value="gcse">GCSEs (or equivalent)</option>
            <option value="alevel">A-Levels (or equivalent)</option>
            <option value="foundation">Foundation Degree</option>
            <option value="undergraduate">Bachelor’s Degree</option>
            <option value="postgraduate">Master’s Degree</option>
            <option value="phd">PhD / Doctorate</option>
        </select>
    </div>
  )
}

export default EducationInput