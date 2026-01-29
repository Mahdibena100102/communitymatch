import React from 'react'
import styles from "./InputFields.module.css"

type EthnicityInputProps = {
  value: string
  onChange: (value: string) => void
}

const EthnicityInput = ({value, onChange}: EthnicityInputProps) => {
  return (
    <div className={styles.inputLayout}>
        <label htmlFor="ethnicity">Ethnicity</label>
        <select 
            className={styles.field}
            id="ethnicity"
            value={value} 
            onChange={(e)=> onChange(e.target.value)}
            required
        >
              <option value="">Select ethnicity</option>
              <option value="arab_middle_eastern">Arab / Middle Eastern</option>
              <option value="south_asian">South Asian (e.g. Indian, Pakistani, Bangladeshi)</option>
              <option value="east_asian">East Asian (e.g. Chinese, Korean, Japanese)</option>
              <option value="southeast_asian">Southeast Asian (e.g. Malay, Filipino, Indonesian)</option>
              <option value="central_asian">Central Asian (e.g. Uzbek, Kazakh)</option>
              <option value="african">African (Sub-Saharan)</option>
              <option value="north_african">North African</option>
              <option value="black_african_caribbean">Black / African-Caribbean</option>
              <option value="white_european">White / European</option>
              <option value="hispanic_latino">Hispanic / Latino</option>
              <option value="mixed">Mixed / Multiple ethnicities</option>
              <option value="other">Other</option>
        </select>
    </div>
  )
}

export default EthnicityInput