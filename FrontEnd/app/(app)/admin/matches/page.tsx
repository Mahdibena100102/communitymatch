"use client"

import React, { useState, useEffect } from 'react'
import AdminListDisplay from '@/components/admincomponents/AdminListDisplay'
import styles from "./page.module.css"
import InfoTopBar from '@/components/admincomponents/InfoTopBar'
import InfoDisplayCard from '@/components/admincomponents/InfoDisplayCard'
import { apiRequest } from '@/lib/api'

const Matches = () => {
    const [matches, setMatches] = useState<any[]>([])
    const [userMap, setUserMap] = useState<Record<number, any>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await apiRequest("/match/mosque")
                const data = res.ok ? await res.json() : []
                setMatches(Array.isArray(data) ? data : [])

                const ids: number[] = []
                data.forEach((m: any) => {
                    ids.push(m.male_id)
                    ids.push(m.female_id)
                })
                const unique = [...new Set(ids)]
                const userEntries = await Promise.all(
                    unique.map(async (id) => {
                        const r = await apiRequest(`/user/${id}`)
                        const u = r.ok ? await r.json() : null
                        return [id, u]
                    })
                )
                setUserMap(Object.fromEntries(userEntries))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchMatches()
    }, [])

    const userName = (id: number) => {
        const u = userMap[id]
        return u ? `${u.first_name} ${u.surname}` : `User ${id}`
    }

    if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

  return (
    <div className={styles.pageWrapper} >
      <h2 className={styles.pageTitle}>Outstanding Matches</h2>
      <AdminListDisplay arrayLength={matches.length} message="No Matches">
        <InfoTopBar stringOne='Male' stringTwo='Female' stringThree='Date'/>
        {matches.map((match) => (
          <InfoDisplayCard
            key={match.id}
            stringOne={userName(match.male_id)}
            stringTwo={userName(match.female_id)}
            dob={match.date_matched ? match.date_matched.substring(0, 10) : ""}
            route={`/admin/matches/match?matchId=${match.id}`}
          />
        ))}
      </AdminListDisplay>
    </div>
  )
}

export default Matches
