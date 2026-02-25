import Link from 'next/link'
import React from 'react'

import styles from "./RedirectBtn.module.css"

type ButtonProps = {
    targetUrl: string
    buttonText: string
    align?: "center" | "left"
    variant?: "button" | "adminSideButton" | "adminButton"
    onClick?: () => void 
}

const RedirectBtn = ({targetUrl, align = "center", buttonText, variant = "button", onClick}: ButtonProps) => {
  return (
      <Link href={targetUrl}>
        <button className={`${styles[variant]} ${align ==="left" ? styles.left:""}`} onClick={onClick}>{buttonText}</button>
      </Link>
  )
}

export default RedirectBtn