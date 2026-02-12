import NavBar from "@/components/Navigation/NavBar";
import UserSideBar from "@/components/Navigation/UserSideBar";
import styles from "./Layout.module.css"

export default function AppLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className={styles.layout}>
      <UserSideBar/>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
