import styles from "./page.module.css"
import Link from "next/link"

const VerifyEmailPage = async ({ searchParams }: { searchParams: Promise<{ token?: string }> }) => {
    const { token } = await searchParams

    if (!token) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.card}>
                    <h3>Invalid Link</h3>
                    <p>This verification link is invalid.</p>
                </div>
            </div>
        )
    }

    let success = false
    try {
        const res = await fetch(`http://localhost:8000/user/verify/${token}`)
        success = res.ok
    } catch {
        success = false
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                {success ? (
                    <>
                        <h3>Email Verified</h3>
                        <p>Your email has been verified. You can now log in.</p>
                        <Link href="/login">Go to login</Link>
                    </>
                ) : (
                    <>
                        <h3>Verification Failed</h3>
                        <p>This link is invalid or has already been used.</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmailPage
