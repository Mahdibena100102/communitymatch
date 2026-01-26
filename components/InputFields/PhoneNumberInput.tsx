"use client"

import React from 'react'
import PhoneInput from 'react-phone-number-input/input'
import styles from "./InputFields.module.css"

type PhoneInputProps = {
    value?: string
    onChange: (value?: string ) => void
}

const PhoneNumberInput = ({value, onChange}: PhoneInputProps) => {
  return (
    <div className={styles.inputLayout}>
      <label htmlFor="phonenumber">Phone Number</label>
      <PhoneInput
        className={styles.field}
        name="phonenumber"
        country='GB'
        value={value}
        onChange={onChange}
        placeholder="Enter Phone Number"
      />
    </div>
  )
}

export default PhoneNumberInput