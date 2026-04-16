"use client"

import styles from "./InputFields.module.css"

type TextAreaInputProps = {
  value: string
  label: string
  placeHolder: string
  onChange: (value: string) => void
}

const TextAreaInput = ({value, label, placeHolder, onChange}: TextAreaInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label>{`${label}`}</label>
        <textarea 
            className={styles.textArea}
            placeholder={placeHolder}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
  )
}

export default TextAreaInput