import React from 'react'
import { redirect } from 'next/navigation'

const AdminPage = () => {
  return (
    redirect("/admin/dashboard")
  )
}

export default AdminPage