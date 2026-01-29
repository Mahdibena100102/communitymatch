"use client"

import React from 'react'

type UploadFileProps {
    file: File | null
}



const UploadFile = ({file}:UploadFileProps) => {

    async function handleUpload(){
        if (!file) return

    } 

  return (
    <button></button>
  )
}

export default UploadFile