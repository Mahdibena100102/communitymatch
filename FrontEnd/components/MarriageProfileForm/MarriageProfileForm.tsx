"use client"

import styles from "./MarriagePF.module.css"
import React, { useState, useEffect } from 'react'
import TextInput from '../InputFields/TextInput'
import NumberInput from '../InputFields/NumberInput'
import EthnicityInput from '../InputFields/EthnicityInput'
import EducationInput from '../InputFields/EducationInput'
import LivingArrangementsInput from '../InputFields/LivingArrangementsInput'
import TextAreaInput from '../InputFields/TextAreaInput'
import SubmitBtn from '../buttons/SubmitBtn'
import EmailInput from '../InputFields/EmailInput'
import PhoneNumberInput from '../InputFields/PhoneNumberInput'
import { apiRequest } from "@/lib/api"
import { getUserId, getGender } from "@/lib/auth"

type MarriageProfileFormProps = {
    initialData?: any
    profileId?: number
    onSaved?: () => void
}

const MarriageProfileForm = ({ initialData, profileId, onSaved }: MarriageProfileFormProps) => {
    const [profession, setProfesion] = useState("")
    const [height, setHeight] = useState<number | "">("")
    const [weight, setWeight] = useState<number | "">("")
    const [ethnicity, setEthnicity] = useState("")
    const [otherEthnicity, setOtherEthnicity] = useState("")
    const [education, setEducation] = useState("")
    const [livingArrangements, setLivingArrangements] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [lookingFor, setLookingFor] = useState("")

    const [guardianName, setGuardianName] = useState("")
    const [guardianSurname, setGuardianSurname] = useState("")
    const [guardianEmail, setGuardianEmail] = useState("")
    const [guardianNumber, setGuardianNumber] = useState<string | undefined>(undefined)

    const [gender, setGender] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const g = getGender()
        if (g) setGender(g)
        if (initialData) {
            if (initialData.profession) setProfesion(initialData.profession)
            if (initialData.height) setHeight(initialData.height)
            if (initialData.weight) setWeight(initialData.weight)
            if (initialData.ethnicity) setEthnicity(initialData.ethnicity)
            if (initialData.education) setEducation(initialData.education)
            if (initialData.living_arrangment) setLivingArrangements(initialData.living_arrangment)
            if (initialData.about_me) setAboutMe(initialData.about_me)
            if (initialData.looking_for) setLookingFor(initialData.looking_for)
            if (initialData.guardian_first_name) setGuardianName(initialData.guardian_first_name)
            if (initialData.guardian_surname) setGuardianSurname(initialData.guardian_surname)
            if (initialData.guardian_email) setGuardianEmail(initialData.guardian_email)
            if (initialData.guardian_phone_number) setGuardianNumber(initialData.guardian_phone_number)
        }
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        const user_id = getUserId()
        if (!user_id) {
            setError("Not logged in")
            return
        }

        try {
            const finalEthnicity = ethnicity === "other" ? otherEthnicity : ethnicity

            if (gender === "female") {
                const guardianRes = await apiRequest(`/user/${user_id}/guardian`, {
                    method: "PUT",
                    body: JSON.stringify({
                        first_name: guardianName,
                        surname: guardianSurname,
                        email: guardianEmail,
                        phone_number: guardianNumber,
                    }),
                })
                if (!guardianRes.ok) {
                    const d = await guardianRes.json()
                    setError(d.error || "Failed to save guardian details")
                    return
                }
            }

            const profileBody = JSON.stringify({
                user_id,
                profession,
                height,
                weight,
                ethnicity: finalEthnicity,
                education,
                living_arrangment: livingArrangements,
                about_me: aboutMe,
                looking_for: lookingFor,
            })

            const res = profileId
                ? await apiRequest(`/marriage-profile/${profileId}`, { method: "PUT", body: profileBody })
                : await apiRequest("/marriage-profile", { method: "POST", body: profileBody })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to save profile")
                return
            }

            if (onSaved) {
                onSaved()
            } else {
                setSuccess(true)
            }
        } catch (err) {
            setError("Could not connect to server")
        }
    }

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h2>Marriage Profile</h2>
        </div>

        {(gender === "female") &&
          <div className={styles.guardianWrapper}>

          <h3 className={styles.sectionHeader}>Guardian Detials</h3>

          <div className={styles.guardianInputs}>
            <TextInput value={guardianName} type='Guardian Name' onChange={setGuardianName}></TextInput>
            <TextInput value={guardianSurname} type='Guardian Surname' onChange={setGuardianSurname}></TextInput>
          </div>

          <div className={styles.guardianInputs}>
            <EmailInput value={guardianEmail} onChange={setGuardianEmail}/>
            <PhoneNumberInput value={guardianNumber} onChange={setGuardianNumber}/>
          </div>
        </div>
        }


        <div className={styles.personalWrapper}>

          <h3 className={styles.sectionHeader}>Profile Information</h3>

          <div className={styles.personalInputs}>
            <TextInput value={profession} type="Profession" onChange={setProfesion}/>
            <NumberInput value={height} name="Height" placeHolder='cm' onChange={setHeight}/>
          </div>

          <div className={styles.personalInputs}>
            <NumberInput value={weight} name="Weight" placeHolder='kg' onChange={setWeight}/>
            <EthnicityInput value={ethnicity} onChange={setEthnicity}/>
            {ethnicity === "other" && (
              <TextInput value={otherEthnicity} type='Other Ethnicity' onChange={setOtherEthnicity}/>
            )}
          </div>

          <div className={styles.personalInputs}>
            <EducationInput value={education} onChange={setEducation}/>
            <LivingArrangementsInput value={livingArrangements} onChange={setLivingArrangements}/>
          </div>

          <div className={styles.personalInputs}>
            <TextAreaInput value={aboutMe} label='About Me' placeHolder='Tell us about yourself' onChange={setAboutMe}/>
          </div>

          <div className={styles.personalInputs}>
            <TextAreaInput value={lookingFor} label='Looking For' placeHolder='What are you looking for' onChange={setLookingFor}/>
          </div>

          {error && <p style={{color: "red", margin: 0, fontSize: 14}}>{error}</p>}
          {success && <p style={{color: "green", margin: 0, fontSize: 14}}>Profile saved!</p>}

          <SubmitBtn buttonText={profileId ? 'Update Profile' : 'Create Profile'}/>

        </div>

    </form>
  )
}

export default MarriageProfileForm
