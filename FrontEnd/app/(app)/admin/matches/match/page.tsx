"use client"

import React, { useState, useEffect, Suspense } from 'react'
import styles from "./page.module.css"
import MatchDetailPanel from '@/components/panels/MatchDetailPanel'
import { useSearchParams, useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api'

const MatchInner = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const matchId = searchParams.get("matchId")

  const [maleUser, setMaleUser] = useState<any>(null)
  const [femaleUser, setFemaleUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [resolving, setResolving] = useState(false)

  useEffect(() => {
    if (!matchId) return

    const fetchMatch = async () => {
      try {
        const res = await apiRequest("/match/all")
        const matches = res.ok ? await res.json() : []
        const match = matches.find((m: any) => m.id === Number(matchId))

        if (match) {
          const [mRes, fRes] = await Promise.all([
            apiRequest(`/user/${match.male_id}`),
            apiRequest(`/user/${match.female_id}`)
          ])
          setMaleUser(mRes.ok ? await mRes.json() : null)
          setFemaleUser(fRes.ok ? await fRes.json() : null)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [matchId])

  const handleResolve = async () => {
    if (!matchId) return
    setResolving(true)
    try {
      await apiRequest(`/match/${matchId}/resolve`, { method: "PUT" })
      router.push("/admin/matches")
    } catch (err) {
      console.log(err)
    } finally {
      setResolving(false)
    }
  }

  if (loading) return <div className={styles.pageWrapper}><p>Loading...</p></div>

  return (
    <div className={styles.pageWrapper}>
        <h2 className={styles.pageTitle}>Match Details</h2>
        <MatchDetailPanel maleUser={maleUser} femaleUser={femaleUser}/>
        <div className={styles.actionBar}>
          <button className={styles.resolveBtn} onClick={handleResolve} disabled={resolving}>
            Mark as Resolved
          </button>
        </div>
    </div>
  )
}

export default function Match() {
  return (
    <Suspense>
      <MatchInner />
    </Suspense>
  )
}
