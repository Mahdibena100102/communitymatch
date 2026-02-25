"use client"

import styles from "./LoginForm.module.css"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitBtn from '../buttons/SubmitBtn'
import EmailInput from "../InputFields/EmailInput"
import PasswordInput from "../InputFields/PasswordInput"


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
        <EmailInput value={email} onChange={setEmail}/>
        <PasswordInput value={password} name="Password" onChange={setPassword}/>

        <div className={styles.btnContainer}>
            <SubmitBtn buttonText='Login'/>
        </div>
    </form>
  )
}

export default LoginForm