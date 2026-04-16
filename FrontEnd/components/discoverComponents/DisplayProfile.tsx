"use client"

import React, { useState, useEffect } from 'react'
import styles from "./DiscoverComp.module.css"
import DecisionButtons from './DecisionButtons'
import { apiRequest } from "@/lib/api"
import { getUserId, getGender } from "@/lib/auth"

type UserProfile = {
    id: number
    first_name: string
    surname: string
    gender: string
    date_of_birth: string
    guardian_first_name?: string
    guardian_surname?: string
    guardian_email?: string
    guardian_phone_number?: string
    profession: string
    height: number
    weight: number
    ethnicity: string
    education: string
    living_arrangment: string
    about_me: string
    looking_for: string
}

type Filters = {
    ageMin: string
    ageMax: string
    heightMin: string
    heightMax: string
    ethnicity: string
    education: string
    livingArrangement: string
}

const emptyFilters: Filters = {
    ageMin: '', 
    ageMax: '',
    heightMin: '', 
    heightMax: '',
    ethnicity: '',
    education: '',
    livingArrangement: '',
}

const calcAge = (dob: string) => {
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age
}

const DisplayProfile = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<Filters>(emptyFilters)
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [showReportForm, setShowReportForm] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [reportSubmitted, setReportSubmitted] = useState(false)

    useEffect(() => {
        const gender = getGender()
        if (!gender) return

        const oppositeGender = gender === "male" ? "female" : "male"

        const fetchProfiles = async () => {
            try {
                const user_id = getUserId()

                const [usersRes, profilesRes, interestsRes, passesRes] = await Promise.all([
                    apiRequest(`/user/approved/${oppositeGender}`),
                    apiRequest(`/marriage-profile`),
                    user_id ? apiRequest(`/interest/by/${user_id}`) : Promise.resolve(null),
                    user_id ? apiRequest(`/pass/by/${user_id}`) : Promise.resolve(null),
                ])

                const users = await usersRes.json()
                const marriageProfiles = await profilesRes.json()
                const interests = interestsRes ? await interestsRes.json() : []
                const passes = passesRes ? await passesRes.json() : []

                const excludedIds = new Set([
                    ...interests.map((i: any) => i.interest_expressed_towards_id),
                    ...passes.map((p: any) => p.user_id_passed),
                ])

                const combined: UserProfile[] = users
                    .map((u: any) => {
                        const mp = marriageProfiles.find((p: any) => p.user_id === u.id)
                        if (!mp) return null
                        return {
                            id: u.id,
                            first_name: u.first_name,
                            surname: u.surname,
                            gender: u.gender,
                            date_of_birth: u.date_of_birth,
                            guardian_first_name: u.guardian_first_name,
                            guardian_surname: u.guardian_surname,
                            guardian_email: u.guardian_email,
                            guardian_phone_number: u.guardian_phone_number,
                            profession: mp.profession,
                            height: mp.height,
                            weight: mp.weight,
                            ethnicity: mp.ethnicity,
                            education: mp.education,
                            living_arrangment: mp.living_arrangment,
                            about_me: mp.about_me,
                            looking_for: mp.looking_for,
                        }
                    })
                    .filter((p: any) => p && !excludedIds.has(p.id))

                setProfiles(combined)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfiles()
    }, [])

    useEffect(() => {
        setCurrentIndex(0)
    }, [filters])

    useEffect(() => {
        setShowReportForm(false)
        setReportReason('')
        setReportSubmitted(false)
    }, [currentIndex])

    const filteredProfiles = profiles.filter(p => {
        const age = calcAge(p.date_of_birth)
        if (filters.ageMin !== '' && age < Number(filters.ageMin)) return false
        if (filters.ageMax !== '' && age > Number(filters.ageMax)) return false
        if (filters.heightMin !== '' && p.height < Number(filters.heightMin)) return false
        if (filters.heightMax !== '' && p.height > Number(filters.heightMax)) return false
        if (filters.ethnicity && p.ethnicity.toLowerCase() !== filters.ethnicity.toLowerCase()) return false
        if (filters.education && p.education.toLowerCase() !== filters.education.toLowerCase()) return false
        if (filters.livingArrangement && p.living_arrangment.toLowerCase() !== filters.livingArrangement.toLowerCase()) return false
        return true
    })

    const uniqueEthnicities = [...new Set(profiles.map(p => p.ethnicity))].sort()
    const uniqueEducations = [...new Set(profiles.map(p => p.education))].sort()
    const uniqueLivingArrangements = [...new Set(profiles.map(p => p.living_arrangment))].sort()

    const activeTags: { key: string; label: string }[] = []
    if (filters.ageMin || filters.ageMax) activeTags.push({ key: 'age', label: `Age: ${filters.ageMin || '0'}–${filters.ageMax || '∞'}` })
    if (filters.heightMin || filters.heightMax) activeTags.push({ key: 'height', label: `Height: ${filters.heightMin || '0'}–${filters.heightMax || '∞'}cm` })
    if (filters.ethnicity) activeTags.push({ key: 'ethnicity', label: `Ethnicity: ${filters.ethnicity}` })
    if (filters.education) activeTags.push({ key: 'education', label: `Education: ${filters.education}` })
    if (filters.livingArrangement) activeTags.push({ key: 'livingArrangement', label: `Living: ${filters.livingArrangement}` })

    const clearTag = (key: string) => {
        if (key === 'age') setFilters(f => ({ ...f, ageMin: '', ageMax: '' }))
        else if (key === 'height') setFilters(f => ({ ...f, heightMin: '', heightMax: '' }))
        else setFilters(f => ({ ...f, [key]: '' }))
    }

    const currentProfile = filteredProfiles[currentIndex]
    const isFirst = currentIndex === 0
    const isLast = currentIndex >= filteredProfiles.length - 1

    const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0))
    const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, filteredProfiles.length - 1))

    const handlePass = async () => {
        if (!currentProfile) return
        const user_id = getUserId()
        if (user_id) {
            try {
                await apiRequest("/pass", {
                    method: "POST",
                    body: JSON.stringify({ user_id_passing: user_id, user_id_passed: currentProfile.id }),
                })
            } catch (err) { console.log(err) }
        }
        setProfiles(prev => prev.filter(p => p.id !== currentProfile.id))
    }

    const handleReport = async () => {
        if (!currentProfile || !reportReason.trim()) return
        const user_id = getUserId()
        if (!user_id) return
        try {
            await apiRequest("/report", {
                method: "POST",
                body: JSON.stringify({
                    reporter_id: user_id,
                    reported_id: currentProfile.id,
                    reason: reportReason.trim(),
                }),
            })
            setReportSubmitted(true)
            setReportReason('')
        } catch (err) {
            console.log(err)
        }
    }

    const handleInterested = async () => {
        if (!currentProfile) return
        const user_id = getUserId()
        if (!user_id) return
        try {
            await apiRequest("/interest", {
                method: "POST",
                body: JSON.stringify({ user_id_expressing_interest: user_id, interest_expressed_towards_id: currentProfile.id }),
            })
        } catch (err) { console.log(err) }
        setProfiles(prev => prev.filter(p => p.id !== currentProfile.id))
    }

    if (loading) return <div className={styles.discoverPage}><p>Loading...</p></div>

    return (
        <div className={styles.discoverPage}>

            <div className={styles.filterBar}>
                <button
                    className={`${styles.filterToggleBtn} ${showFilterPanel ? styles.filterToggleBtnActive : ''}`}
                    onClick={() => setShowFilterPanel(v => !v)}
                >
                    Filters
                </button>
                <div className={styles.activeTags}>
                    {activeTags.map(tag => (
                        <span key={tag.key} className={styles.filterTag}>
                            {tag.label}
                            <button className={styles.tagClose} onClick={() => clearTag(tag.key)}>×</button>
                        </span>
                    ))}
                </div>
                {activeTags.length > 0 && (
                    <button className={styles.clearAllBtn} onClick={() => setFilters(emptyFilters)}>Clear all</button>
                )}
            </div>

            {showFilterPanel && (
                <div className={styles.filterPanel}>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterGroupLabel}>Age</span>
                        <input type="number" placeholder="Min" min={18} className={styles.filterInput} value={filters.ageMin} onChange={e => setFilters(f => ({ ...f, ageMin: e.target.value }))}/>
                        <span className={styles.filterSeparator}>–</span>
                        <input type="number" placeholder="Max" min={18} className={styles.filterInput} value={filters.ageMax} onChange={e => setFilters(f => ({ ...f, ageMax: e.target.value }))}/>
                    </div>
                    <div className={styles.filterGroup}>
                        <span className={styles.filterGroupLabel}>Height (cm)</span>
                        <input type="number" placeholder="Min" className={styles.filterInput} value={filters.heightMin} onChange={e => setFilters(f => ({ ...f, heightMin: e.target.value }))}/>
                        <span className={styles.filterSeparator}>–</span>
                        <input type="number" placeholder="Max" className={styles.filterInput} value={filters.heightMax} onChange={e => setFilters(f => ({ ...f, heightMax: e.target.value }))}/>
                    </div>
                    {uniqueEthnicities.length > 0 && (
                        <div className={styles.filterGroup}>
                            <span className={styles.filterGroupLabel}>Ethnicity</span>
                            <select className={styles.filterSelect} value={filters.ethnicity} onChange={e => setFilters(f => ({ ...f, ethnicity: e.target.value }))}>
                                <option value="">Any</option>
                                {uniqueEthnicities.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    )}
                    {uniqueEducations.length > 0 && (
                        <div className={styles.filterGroup}>
                            <span className={styles.filterGroupLabel}>Education</span>
                            <select className={styles.filterSelect} value={filters.education} onChange={e => setFilters(f => ({ ...f, education: e.target.value }))}>
                                <option value="">Any</option>
                                {uniqueEducations.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    )}
                    {uniqueLivingArrangements.length > 0 && (
                        <div className={styles.filterGroup}>
                            <span className={styles.filterGroupLabel}>Living Arrangement</span>
                            <select className={styles.filterSelect} value={filters.livingArrangement} onChange={e => setFilters(f => ({ ...f, livingArrangement: e.target.value }))}>
                                <option value="">Any</option>
                                {uniqueLivingArrangements.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.displayProfileWrapper}>
                <div>
                    <button className={styles.button} disabled={isFirst} onClick={handlePrev}>Prev</button>
                </div>

                {currentProfile ? (
                    <div className={styles.profileCard} key={currentProfile.id}>
                        <p style={{fontSize: '0.75rem', color: '#aaa', flexDirection: 'row'}}>{currentIndex + 1} / {filteredProfiles.length}</p>
                        <div className={styles.profileRow}>
                            <p><span className={styles.profileLabel}>Age</span>{calcAge(currentProfile.date_of_birth)}</p>
                            <p><span className={styles.profileLabel}>Date of Birth</span>{currentProfile.date_of_birth.substring(0, 10)}</p>
                        </div>
                        <div className={styles.profileRow}>
                            <p><span className={styles.profileLabel}>Height</span>{currentProfile.height}cm</p>
                            <p><span className={styles.profileLabel}>Weight</span>{currentProfile.weight}kg</p>
                        </div>
                        <div className={styles.profileRow}>
                            <p><span className={styles.profileLabel}>Profession</span>{currentProfile.profession}</p>
                            <p><span className={styles.profileLabel}>Ethnicity</span>{currentProfile.ethnicity}</p>
                        </div>
                        <p><span className={styles.profileLabel}>About Me</span>{currentProfile.about_me}</p>
                        <p><span className={styles.profileLabel}>Looking For</span>{currentProfile.looking_for}</p>
                        <DecisionButtons onPass={handlePass} onInterested={handleInterested}/>
                        <div className={styles.reportSection}>
                            {!showReportForm && !reportSubmitted && (
                                <button className={styles.reportLink} onClick={() => setShowReportForm(true)}>Report this profile</button>
                            )}
                            {showReportForm && !reportSubmitted && (
                                <div className={styles.reportForm}>
                                    <textarea
                                        className={styles.reportTextarea}
                                        placeholder="Describe the reason for reporting..."
                                        value={reportReason}
                                        onChange={e => setReportReason(e.target.value)}
                                        rows={3}
                                    />
                                    <div className={styles.reportFormButtons}>
                                        <button className={styles.reportCancelBtn} onClick={() => { setShowReportForm(false); setReportReason('') }}>Cancel</button>
                                        <button className={styles.reportSubmitBtn} onClick={handleReport} disabled={!reportReason.trim()}>Submit</button>
                                    </div>
                                </div>
                            )}
                            {reportSubmitted && (
                                <p className={styles.reportConfirmation}>Report submitted.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.profileCard}>
                        <p>No profiles match your filters.</p>
                    </div>
                )}

                <div>
                    <button className={styles.button} disabled={isLast} onClick={handleNext}>Next</button>
                </div>
            </div>

        </div>
    )
}

export default DisplayProfile








