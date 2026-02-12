import NavBar from "@/components/Navigation/NavBar";
import styles from "./Layout.module.css"
import AdminSideBar from "@/components/Navigation/AdminSideBar";

export default function AppLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className={styles.layout}>
      <AdminSideBar/>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
