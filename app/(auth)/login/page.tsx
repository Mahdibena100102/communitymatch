import styles from "./page.module.css";

import LoginForm from "@/components/LoginForm/LoginForm";
import Link from 'next/link'
import React from 'react'
import RedirectBtn from "@/components/Buttons/RedirectBtn";

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginPage}>
        <div className={styles.textSegment}>
          <h1>Community Match</h1>
          <p>The halla way to find marriage within your community.</p>
        </div>
        <div className={styles.loginFormContainer}>
          <h3 className={styles.loginFormHeader}>Welcome Back</h3>
          <LoginForm/>
          <div className={styles.btnContainer}>
           <Link href="/registration">Register</Link>        
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default LoginPage