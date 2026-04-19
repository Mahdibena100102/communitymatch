import AdminDashboardCards from '@/components/Cards/AdminDashboardCards'
import React from 'react'
import styles from "./page.module.css"

const Dashboard = () => {
  return (
    <div className={styles.pageWrapper}>
        <h2 className={styles.pageTitle}>Admin Dashboard</h2>
        <AdminDashboardCards/>
    </div>
)
}

export default Dashboard