import NavBar from "@/components/Navigation/NavBar";
import SideBar from "@/components/Navigation/SideBar";
import styles from "./Layout.module.css"

export default function AppLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className={styles.layout}>
      <SideBar/>
      <main className={styles.content}>{children}</main>
    </div>
        
  );
}
