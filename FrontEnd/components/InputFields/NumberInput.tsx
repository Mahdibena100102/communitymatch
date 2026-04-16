import React from 'react'
import styles from "./InputFields.module.css"

type NumberInputProps = {
    value: number | ""
    name: string
    placeHolder: string
    onChange: (number:number | "") => void
}

const NumberInput = ({value, name, placeHolder,onChange}: NumberInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label>{name}</label>
        <input 
            className={styles.field}
            type='number' 
            value={value}
            placeholder={placeHolder}
            onChange={(e)=> onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
    </div>
  )
}

export default NumberInput