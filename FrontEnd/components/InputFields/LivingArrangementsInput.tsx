import React from 'react'
import styles from "./InputFields.module.css"


type LivingArrangementsInputProps = {
  value: string
  onChange: (value: string) => void
}

const LivingArrangementsInput = ({value, onChange}: LivingArrangementsInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor="living arrangements">Living Arrangements</label>
        <select 
            className={styles.field}
            id="living arrangements"
            value={value} 
            onChange={(e)=> onChange(e.target.value)}
            required
        >
                <option value="">Select Arrangements</option>
                <option value="family">With Family</option>
                <option value="alone">Living Alone</option>
                <option value="abroad">Moving Abroad</option>
        </select>
    </div>
  )
}

export default LivingArrangementsInput