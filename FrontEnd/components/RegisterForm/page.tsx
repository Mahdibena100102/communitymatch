"use client"

import styles from "./RegisterForm.module.css"
import SubmitBtn from '../Buttons/SubmitBtn'

import React, { useState, useEffect } from 'react'
import TextInput from '../InputFields/TextInput'
import DateInput from "../InputFields/DateInput"
import GenderInput from "../InputFields/GenderInput"
import EmailInput from "../InputFields/EmailInput"
import PasswordInput from "../InputFields/PasswordInput"
import PhoneNumberInput from "../InputFields/PhoneNumberInput"
import MosqueSelection from "../InputFields/MosqueSelection"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/lib/api"


const RegisterForm = () => {
    type Mosque = {
        id: number
        name: string
    }

    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [selectedMosque, setSelectedMosque] = useState("")
    const [MosquesArray, setMosquesArray] = useState<Mosque[]>([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    useEffect(() => {
        apiRequest("/mosque")
            .then(res => res.json())
            .then(data => {
                const mosques = data.map((m: any) => ({ id: m.id, name: m.moque_name }))
                setMosquesArray(mosques)
            })
            .catch(() => {})
    }, [])

    async function handleSumbit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            const res = await apiRequest("/user", {
                method: "POST",
                body: JSON.stringify({
                    first_name: firstName,
                    surname,
                    email,
                    password,
                    phone_number: phoneNumber,
                    gender,
                    date_of_birth: dateOfBirth,
                    mosque_id: Number(selectedMosque),
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Registration failed")
                return
            }

            setSuccess(true)
            setTimeout(() => router.push("/login"), 2000)
        } catch (err) {
            setError("Could not connect to server")
        }
    }

  return (
    <form onSubmit={handleSumbit} className={styles.form}>
        {success && <p style={{color: "green", textAlign: "center"}}>Registration successful! Redirecting to login...</p>}

        <div className={styles.formRow}>
            <TextInput value={firstName} type='First Name' onChange={setFirstName}/>
            <TextInput value={surname} type='Surname' onChange={setSurname}/>
        </div>

        <div className={styles.formRow}>
            <DateInput value={dateOfBirth} name="Date of Birth" onChange={setDateOfBirth}/>
            <GenderInput value={gender} onChange={setGender}/>
        </div>

        <div className={styles.formRow}>
            <EmailInput value={email} onChange={setEmail}/>
            <PasswordInput value={password} name="Password" onChange={setPassword}/>
        </div>

        <div className={styles.formRow}>
            <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber}/>
            <PasswordInput value={confirmPassword} name="Confirm Password" onChange={setConfirmPassword}/>
        </div>

        <div className={styles.formRow}>
            <MosqueSelection mosques={MosquesArray} value={selectedMosque} onChange={setSelectedMosque}/>
        </div>

        {error && <p style={{color: "red", margin: 0, fontSize: 14}}>{error}</p>}

        <div className={styles.btnContainer}>
            <SubmitBtn buttonText='Register'/>
        </div>
    </form>
  )
}

export default RegisterForm
