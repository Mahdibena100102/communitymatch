"use client"
import styles from "./InputFields.module.css"

type EmailInputProps = {
  value: string
  onChange: (value: string) => void
}

const EmailInput = ({value, onChange}: EmailInputProps) => {
  return (
    <div className={styles.inputLayout}>
      <label htmlFor="email">Email</label>
      <input 
          className={styles.field}
          name="email"
          type="email"
          placeholder='Enter Email'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
      />
    </div>
  )
}

export default EmailInput