import React from 'react'
import styles from "./InputFields.module.css"

type Mosque = {
  id: number
  name: string
}

type MosqueSelectionProps = {
  mosques: Mosque[]
  value: string
  onChange: (value: string) => void
}

const MosqueSelection = ({mosques, value, onChange}: MosqueSelectionProps) => {
  return (
    <div className={styles.inputLayout}>
        <label>Mosque</label>
        <select 
            className={styles.field}
            value={value} 
            onChange={(e)=> onChange(e.target.value)}
            required
        >
            <option value="">Select Mosque</option>
            {mosques.map((mosque) => (
                <option key={mosque.id} value={mosque.name}>{mosque.name}</option>
            ))}
    
        </select>
    </div>
  )
}

export default MosqueSelection