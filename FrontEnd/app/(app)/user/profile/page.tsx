"use client"

import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import MarriageProfileForm from '@/components/MarriageProfileForm/MarriageProfileForm'
import { apiRequest } from '@/lib/api'
import { getUserId } from '@/lib/auth'

const ProfilePage = () => {
    const [profile, setProfile] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    const loadData = async () => {
        const userId = getUserId()
        if (!userId) return
        const [userRes, profileRes] = await Promise.all([
            apiRequest(`/user/${userId}`),
            apiRequest(`/marriage-profile/user/${userId}`)
        ])
        setUser(await userRes.json())
        setProfile(profileRes.ok ? await profileRes.json() : null)
        setLoading(false)
    }

    useEffect(() => { loadData() }, [])

    if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

    if (!profile || editing) {
        const initialData = editing && profile ? {
            ...profile,
            guardian_first_name: user?.guardian_first_name,
            guardian_surname: user?.guardian_surname,
            guardian_email: user?.guardian_email,
            guardian_phone_number: user?.guardian_phone_number,
        } : undefined

        return (
            <div>
                {editing && (
                    <div className={styles.cancelBar}>
                        <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                )}
                <MarriageProfileForm
                    initialData={initialData}
                    profileId={editing ? profile?.id : undefined}
                    onSaved={() => { setEditing(false); setLoading(true); loadData() }}
                />
            </div>
        )
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.profileHeader}>
                <h2>Marriage Profile</h2>
                <button className={styles.editBtn} onClick={() => setEditing(true)}>Edit</button>
            </div>

            {user?.gender === "female" && (
                <div className={styles.section}>
                    <h3 className={styles.sectionHeader}>Guardian Details</h3>
                    <div className={styles.row}>
                        <p><span className={styles.label}>Name</span>{user.guardian_first_name} {user.guardian_surname}</p>
                        <p><span className={styles.label}>Email</span>{user.guardian_email}</p>
                    </div>
                    <div className={styles.row}>
                        <p><span className={styles.label}>Phone</span>{user.guardian_phone_number}</p>
                    </div>
                </div>
            )}

            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>Profile Information</h3>
                <div className={styles.row}>
                    <p><span className={styles.label}>Profession</span>{profile.profession}</p>
                    <p><span className={styles.label}>Height</span>{profile.height}cm</p>
                </div>
                <div className={styles.row}>
                    <p><span className={styles.label}>Weight</span>{profile.weight}kg</p>
                    <p><span className={styles.label}>Ethnicity</span>{profile.ethnicity}</p>
                </div>
                <div className={styles.row}>
                    <p><span className={styles.label}>Education</span>{profile.education}</p>
                    <p><span className={styles.label}>Living Arrangement</span>{profile.living_arrangment}</p>
                </div>
                <div className={styles.rowFull}>
                    <p className={styles.label}>About Me</p>
                    <p>{profile.about_me}</p>
                </div>
                <div className={styles.rowFull}>
                    <p className={styles.label}>Looking For</p>
                    <p>{profile.looking_for}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
