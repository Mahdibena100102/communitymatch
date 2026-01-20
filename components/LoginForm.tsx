"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSumbit(e:React.FormEvent){
        e.preventDefault()
        router.push("/dashboard")
    }
  return (
    <form onSubmit={handleSumbit} style={{display: 'grid', gap: 12}}>
        <input 
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            style={{padding: 10}}
            required
        />
        
        <input 
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            style={{padding: 10}}
            required
        />

        <button type="submit" style={{width:100,padding: 10}}>Login</button> 
    </form>
  )
}

export default LoginForm