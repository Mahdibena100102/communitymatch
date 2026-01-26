import Link from 'next/link'
import React from 'react'
import styles from "./Navigations.module.css"

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <Link href="/">Home</Link>
      <Link href="/registration">Register</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  )
}

export default NavBar