import Link from 'next/link'
import React from 'react'

import styles from "./RedirectBtn.module.css"

type ButtonProps = {
    buttonText: string
}

const SubmitBtn = ({buttonText}: ButtonProps) => {
  return (
    <button type="submit" className={styles.button}>{buttonText}</button>
  )
}

export default SubmitBtn