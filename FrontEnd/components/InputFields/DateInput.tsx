import React from 'react'
import styles from "./InputFields.module.css"

type DateInput = {
  value: string
  name: string
  onChange: (value: string) => void
}

const DateInput = ({value, name, onChange}: DateInput) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor="date">{`${name}`}</label>
        <input 
            className={styles.field}
            name='date'
            type="date"
            placeholder={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
  )
}

export default DateInput