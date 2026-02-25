import React from 'react'
import styles from "./AdminComponents.module.css"

type AdminCardListDisplayProps = {
    arrayLength: number;
    message: string;
    children?: React.ReactNode;
}

const AdminListDisplay = ({arrayLength, message, children}: AdminCardListDisplayProps) => {
  return (
    <div className={(arrayLength === 0) ? styles.adminListCardWrapperEmpty : styles.adminListCardWrapper}>
        {(arrayLength === 0) ? <p>{message}</p> : children}
    </div>
  )
}

export default AdminListDisplay