import React from 'react'
import styles from "./Cards.module.css"
import RedirectBtn from '../Buttons/RedirectBtn'

type AdminDashBoardCardProps = {
    heading: string
    arrayLength: number
    route: string
}

const AdminDashBoardCard = ({heading, arrayLength, route}: AdminDashBoardCardProps) => {
  return (
    <div className={styles.cardWrapper}>
        <div><h3>{heading} : {arrayLength}</h3></div>
        <RedirectBtn targetUrl={route} buttonText='View'/>
    </div>
  )
}

export default AdminDashBoardCard