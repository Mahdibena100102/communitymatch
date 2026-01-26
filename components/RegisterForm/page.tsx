"use client"

import styles from "./RegisterForm.module.css"
import SubmitBtn from '../Buttons/SubmitBtn'


import React, { useState } from 'react'
import TextInput from '../InputFields/TextInput'
import DateInput from "../InputFields/DateInput"
import GenderInput from "../InputFields/GenderInput"
import EmailInput from "../InputFields/EmailInput"
import PasswordInput from "../InputFields/PasswordInput"
import PhoneNumberInput from "../InputFields/PhoneNumberInput"
import { useRouter } from "next/navigation"



const RegisterForm = () => {
    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const router = useRouter()


    function handleSumbit(e:React.FormEvent){
        e.preventDefault()
        router.push("/dashboard")
    }
  
  return (
    <form onSubmit={handleSumbit} className={styles.form}>
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

        <div className={styles.btnContainer}>
            <SubmitBtn buttonText='Register'/>
        </div>
    </form>
  )
}

export default RegisterForm