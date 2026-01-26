"use client"

import styles from "./InputFields.module.css"


type PasswordInputProps = {
  value: string
  name: string
  onChange: (value: string) => void
}

const PasswordInput = ({value, name, onChange}: PasswordInputProps) => {
  return (
    <div className={styles.inputLayout}>
      <label htmlFor="password">{name}</label>
      <input 
          className={styles.field}
          name="password"
          type="password"
          placeholder={`Enter Password`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
      />
    </div>
  )
}

export default PasswordInput