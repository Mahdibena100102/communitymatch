"use client"

import React, { useState, useEffect } from 'react'
import styles from "./page.module.css"
import { apiRequest } from '@/lib/api'

type User = {
    id: number
    first_name: string
    surname: string
    email: string
    gender: string
    date_of_birth: string
    pending_admin_verification: boolean
    email_verified: boolean
}

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [emailVerified, setEmailVerified] = useState('')

    useEffect(() => {
        apiRequest('/user/all')
            .then(res => res.json())
            .then(data => setUsers(Array.isArray(data) ? data : []))
            .catch(() => setUsers([]))
            .finally(() => setLoading(false))
    }, [])

    const filtered = users.filter(u => {
        if (search) {
            const q = search.toLowerCase()
            const fullName = `${u.first_name} ${u.surname}`.toLowerCase()
            if (!fullName.includes(q) && !u.email.toLowerCase().includes(q)) return false
        }
        if (gender && u.gender !== gender) return false
        if (status === 'pending' && !u.pending_admin_verification) return false
        if (status === 'approved' && u.pending_admin_verification) return false
        if (emailVerified === 'verified' && !u.email_verified) return false
        if (emailVerified === 'unverified' && u.email_verified) return false
        return true
    })

    const formatDob = (dob: string) => {
        const d = new Date(dob)
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
    }

    const activeFilterCount = [search, gender, status, emailVerified].filter(Boolean).length

    if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

    return (
        <div className={styles.pageWrapper}>
            <h2 className={styles.pageTitle}>Users</h2>

            <div className={styles.filterBar}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <select value={gender} onChange={e => setGender(e.target.value)} className={styles.filterSelect}>
                    <option value="">All genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} className={styles.filterSelect}>
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>
                <select value={emailVerified} onChange={e => setEmailVerified(e.target.value)} className={styles.filterSelect}>
                    <option value="">Email: any</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                </select>
                {activeFilterCount > 0 && (
                    <button className={styles.clearBtn} onClick={() => { setSearch(''); setGender(''); setStatus(''); setEmailVerified('') }}>
                        Clear all
                    </button>
                )}
                <span className={styles.count}>{filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            <div className={filtered.length === 0 ? styles.tableWrapperEmpty : styles.tableWrapper}>
                {filtered.length === 0 ? (
                    <p>No users match the current filters.</p>
                ) : (
                    <>
                        <div className={styles.tableHeader}>
                            <span>Name</span>
                            <span>Gender</span>
                            <span>Date of Birth</span>
                            <span>Status</span>
                            <span>Email</span>
                            <span></span>
                        </div>
                        {filtered.map(u => (
                            <div className={styles.tableRow} key={u.id}>
                                <span className={styles.cell}>{u.first_name} {u.surname}</span>
                                <span className={styles.cell} style={{textTransform: 'capitalize'}}>{u.gender}</span>
                                <span className={styles.cell}>{formatDob(u.date_of_birth)}</span>
                                <span className={styles.cell}>
                                    <span className={u.pending_admin_verification ? styles.badgePending : styles.badgeApproved}>
                                        {u.pending_admin_verification ? 'Pending' : 'Approved'}
                                    </span>
                                </span>
                                <span className={styles.cell}>
                                    <span className={u.email_verified ? styles.badgeApproved : styles.badgePending}>
                                        {u.email_verified ? 'Verified' : 'Unverified'}
                                    </span>
                                </span>
                                <a href={`/admin/applicants/details?userCode=${u.id}&readOnly=true`} className={styles.viewBtn}>View</a>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default UsersPage
