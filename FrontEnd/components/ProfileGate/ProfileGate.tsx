"use client"

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'
import { getUserId } from '@/lib/auth'
import styles from './ProfileGate.module.css'

const ProfileGate = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [status, setStatus] = useState<'loading' | 'no_profile' | 'pending_approval' | 'ok'>('loading')

    useEffect(() => {
        const check = async () => {
            const userId = getUserId()
            if (!userId) {
                router.push('/login')
                return
            }

            const [userRes, profileRes] = await Promise.all([
                apiRequest(`/user/${userId}`),
                apiRequest(`/marriage-profile/user/${userId}`)
            ])

            if (!userRes.ok) {
                router.push('/login')
                return
            }

            const user = await userRes.json()

            if (!profileRes.ok) {
                setStatus('no_profile')
                return
            }

            if (user.pending_admin_verification) {
                setStatus('pending_approval')
                return
            }

            setStatus('ok')
        }
        check()
    }, [pathname])

    if (pathname === '/user/profile') return <>{children}</>

    if (status === 'loading') return <div className={styles.gateWrapper}><p>Loading...</p></div>

    if (status === 'no_profile') {
        return (
            <div className={styles.gateWrapper}>
                <div className={styles.gateCard}>
                    <h2>Complete Your Profile</h2>
                    <p>You need to set up your marriage profile before you can access the platform.</p>
                    <button className={styles.gateBtn} onClick={() => router.push('/user/profile')}>
                        Set Up Profile
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'pending_approval') {
        return (
            <div className={styles.gateWrapper}>
                <div className={styles.gateCard}>
                    <h2>Pending Approval</h2>
                    <p>Your profile is awaiting approval from your mosque administrator. You will be able to access the platform once approved.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default ProfileGate
