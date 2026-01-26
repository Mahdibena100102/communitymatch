import Link from 'next/link'
import React from 'react'

import styles from "./RedirectBtn.module.css"

type ButtonProps = {
    targetUrl: string
    buttonText: string
    align?: "center" | "left"
}

const RedirectBtn = ({targetUrl, align = "center", buttonText}: ButtonProps) => {
  return (
      <Link href={targetUrl}>
        <button className={`${styles.button} ${align ==="left" ? styles.left:""}`}>{buttonText}</button>
      </Link>
  )
}

export default RedirectBtn