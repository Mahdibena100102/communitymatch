import React from 'react'
import RedirectBtn from '../buttons/RedirectBtn'
import styles from "./AdminComponents.module.css"

type InfoTopBarProps = {
    stringOne: string
    stringTwo: string
    stringThree: string
}

const InfoTopBar = ({stringOne, stringTwo, stringThree,}: InfoTopBarProps) => {
  return (
    <div className={styles.infoTopBarWrapper}>
        <div className={styles.divStyling}>{stringOne}</div>
        <div className={styles.divStyling}>{stringTwo}</div>
        <div className={styles.divStyling}>{stringThree}</div>
        <div className={styles.emptyPadding}></div>
    </div>
  )
}

export default InfoTopBar