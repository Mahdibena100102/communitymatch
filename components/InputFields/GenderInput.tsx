import React from 'react'
import styles from "./InputFields.module.css"


type GenderInput = {
  value: string
  onChange: (value: string) => void
}

const GenderInput = ({value, onChange}: GenderInput) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor="gender">Gender</label>
        <select 
            className={styles.field}
            id="gender"
            value={value} 
            onChange={(e)=> onChange(e.target.value)}
            required
        >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
        </select>
    </div>
  )
}

export default GenderInput