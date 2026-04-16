"use client"

import React, { useState, useEffect } from 'react'
import styles from "./page.module.css"
import { apiRequest } from '@/lib/api'
import { getUserId } from '@/lib/auth'

type LikedProfile = {
    id: number
    date_of_birth: string
    ethnicity: string
    profession: string
    interest_id: number
}

const LikedProfiles = () => {
    const [interested, setInterested] = useState<LikedProfile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user_id = getUserId()
        if (!user_id) return

        const fetchLiked = async () => {
            try {
                const interestRes = await apiRequest(`/interest/by/${user_id}`)
                const interests = await interestRes.json()

                const profiles: LikedProfile[] = []

                for (const interest of interests) {
                    const [userRes, mpRes] = await Promise.all([
                        apiRequest(`/user/${interest.interest_expressed_towards_id}`),
                        apiRequest(`/marriage-profile/user/${interest.interest_expressed_towards_id}`)
                    ])
                    const user = await userRes.json()
                    const mp = mpRes.ok ? await mpRes.json() : null

                    profiles.push({
                        id: user.id,
                        date_of_birth: user.date_of_birth,
                        ethnicity: mp ? mp.ethnicity : "",
                        profession: mp ? mp.profession : "",
                        interest_id: interest.id,
                    })
                }

                setInterested(profiles)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchLiked()
    }, [])

    const handleRemove = async (profile: LikedProfile) => {
        try {
            await apiRequest(`/interest/entry/${profile.interest_id}`, { method: "DELETE" })
        } catch (err) {
            console.log(err)
        }
        setInterested(prev => prev.filter(p => p.id !== profile.id))
    }

    const calcAge = (dob: string) => {
        const birth = new Date(dob)
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
        return age
    }

    const formatDob = (dob: string) => {
        const d = new Date(dob)
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        return `${day}/${month}/${year}`
    }

    if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

    return (
        <div className={styles.pageWrapper}>
            <h2 className={styles.pageTitle}>Liked</h2>
            <div className={interested.length === 0 ? styles.cardWrapperEmpty : styles.cardWrapper}>
                {interested.length === 0 ? (
                    <p>No liked profiles yet.</p>
                ) : (
                    <>
                        {interested.map(profile => (
                            <div className={styles.profileWrapper} key={profile.id}>
                                <span className={styles.field}>
                                    <span className={styles.label}>Age</span>
                                    {calcAge(profile.date_of_birth)}
                                </span>
                                <span className={styles.field}>
                                    <span className={styles.label}>Date of Birth</span>
                                    {formatDob(profile.date_of_birth)}
                                </span>
                                <span className={styles.field}>
                                    <span className={styles.label}>Ethnicity</span>
                                    {profile.ethnicity}
                                </span>
                                <span className={styles.field}>
                                    <span className={styles.label}>Profession</span>
                                    {profile.profession}
                                </span>
                                <button className={styles.removeBtn} onClick={() => handleRemove(profile)}>Remove</button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default LikedProfiles
