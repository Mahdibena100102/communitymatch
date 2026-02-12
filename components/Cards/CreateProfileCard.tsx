import React from 'react'
import RedirectBtn from '../Buttons/RedirectBtn'
import styles from "./Cards.module.css"

const CreateProfileCard = () => {
  return (
    <div className={styles.cardWrapper}>
        <h3 className={styles.cardHeader}>Create Marriage Profile</h3>
        <div className={styles.buttonWrapper}>
         <RedirectBtn targetUrl='/user/profile' buttonText='Click Here'/>
        </div>
    </div>
  )
}

export default CreateProfileCard
