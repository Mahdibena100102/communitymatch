import RegisterForm from '@/components/RegisterForm/page'
import React from 'react'
import styles from "./page.module.css";

const RegistrationPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        <RegisterForm/>
      </div>
   </div>
  )
}

export default RegistrationPage