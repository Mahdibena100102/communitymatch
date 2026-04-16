"use client"

import styles from "./LoginForm.module.css"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitBtn from '../buttons/SubmitBtn'
import EmailInput from "../InputFields/EmailInput"
import PasswordInput from "../InputFields/PasswordInput"
import { apiRequest } from "@/lib/api"
import { saveUser } from "@/lib/auth"


const LoginForm = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSumbit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        try {
            const res = await apiRequest("/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Login failed")
                return
            }

            saveUser(data)

            if (data.role === "admin") {
                router.push("/admin/dashboard")
            } else {
                const profileRes = await apiRequest(`/marriage-profile/user/${data.user_id}`)
                if (profileRes.ok) {
                    router.push("/user/discover")
                } else {
                    router.push("/user/actions")
                }
            }

        } catch (err) {
            setError("Could not connect to server")
        }
    }

  return (
    <form onSubmit={handleSumbit} style={{display: 'grid', gap: 12}}>
        <EmailInput value={email} onChange={setEmail}/>
        <PasswordInput value={password} name="Password" onChange={setPassword}/>

        {error && <p style={{color: "red", margin: 0, fontSize: 14}}>{error}</p>}

        <div className={styles.btnContainer}>
            <SubmitBtn buttonText='Login'/>
        </div>
    </form>
  )
}

export default LoginForm
