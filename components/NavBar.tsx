import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav style={{display: "flex", gap: 12, padding: 12 }}>
      <Link href="/">Home</Link>
      <Link href="/registration">Register</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  )
}

export default NavBar