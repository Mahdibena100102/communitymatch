import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <LoginForm/>
      <Link href="/registration">
        <button type='button' style={{width:100,padding: 10}}>Register</button>
      </Link>
    </>
    
  )
}

export default LoginPage