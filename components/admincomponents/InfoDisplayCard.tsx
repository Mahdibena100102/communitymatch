import React from 'react'
import RedirectBtn from '../buttons/RedirectBtn'
import styles from "./AdminComponents.module.css"

type InfoDisplayCardProps = {
    stringOne: string
    stringTwo: string
    dob: string
    route: string
}



const InfoDisplayCard = ({stringOne, stringTwo, dob, route}: InfoDisplayCardProps) => {

  return (
    <div className={styles.infoCardWrapper}>
        <div className={styles.divStyling}>{stringOne}</div>
        <div className={styles.divStyling}>{stringTwo}</div>
        <div className={styles.divStyling}>{dob}</div>
        <RedirectBtn targetUrl={route} buttonText='View' variant='adminButton'/>
    </div>
  )
}

export default InfoDisplayCard