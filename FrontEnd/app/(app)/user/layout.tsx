import UserSideBar from "@/components/Navigation/UserSideBar";
import ProfileGate from "@/components/ProfileGate/ProfileGate";
import styles from "./Layout.module.css"

export default function AppLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className={styles.layout}>
      <UserSideBar/>
      <main className={styles.content}>
        <ProfileGate>{children}</ProfileGate>
      </main>
    </div>
  );
}
