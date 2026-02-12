import React from 'react'
import AdminDashboardCard from "./AdminDashboardCard"
import styles from "./Cards.module.css"

const AdminDashboardCards = () => {
  return (
    <div className={styles.adminDashboardCardsWrapper}>
        <AdminDashboardCard heading='Pending Verfication' arrayLength={5} route='/admin/dashboard'/>
        <AdminDashboardCard heading='New Matches' arrayLength={5} route='/admin/dashboard'/>
        <AdminDashboardCard heading='New Users Reported' arrayLength={5} route='/admin/dashboard'/>
    </div>
  )
}

export default AdminDashboardCards