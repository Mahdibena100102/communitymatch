"use client"

import styles from "./InputFields.module.css"

type TextInputProps = {
  value: string
  type: string
  onChange: (value: string) => void
}

const TextInput = ({value, type, onChange}: TextInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor={type}>{`${type}`}</label>
        <input 
            className={styles.field}
            name={type}
            type="text"
            placeholder={`Enter ${type}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
  )
}

export default TextInput