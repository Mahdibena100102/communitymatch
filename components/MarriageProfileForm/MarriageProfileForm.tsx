"use client"

import styles from "./MarriagePF.module.css"
import React, { useState } from 'react'
import TextInput from '../InputFields/TextInput'
import NumberInput from '../InputFields/NumberInput'
import EthnicityInput from '../InputFields/EthnicityInput'
import EducationInput from '../InputFields/EducationInput'
import LivingArrangementsInput from '../InputFields/LivingArrangementsInput'
import TextAreaInput from '../InputFields/TextAreaInput'
import SubmitBtn from '../buttons/SubmitBtn'
import EmailInput from '../InputFields/EmailInput'
import PhoneNumberInput from '../InputFields/PhoneNumberInput'

const MarriageProfileForm = () => {
    const [profession, setProfesion] = useState("")
    const [height, setHeight] = useState<number | "">("")
    const [ethnicity, setEthnicity] = useState("")
    const [otherEthnicity, setOtherEthnicity] = useState("")
    const [education, setEducation] = useState("")
    const [livingArrangements, setLivingArrangements] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [lookingFor, setLookingFor] = useState("")

    //guardian form
    const [gender, setGender] = useState("female")
    const [guardianName, setGuardianName] = useState("")
    const [guardianSurname, setGuardianSurname] = useState("")
    const [guardianEmail, setGuardianEmail] = useState("")
    const [guardianNumber, setGuardianNumber] = useState<string | undefined>(undefined)
    

    
  return (
    <form className={styles.formWrapper}>
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
            <NumberInput value={height} name="Weight" placeHolder='kg' onChange={setHeight}/>
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

            <SubmitBtn buttonText='Create Profile'/>

        </div>
  
    </form>
  )
}

export default MarriageProfileForm