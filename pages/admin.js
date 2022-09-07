import SideNav from '../components/Sidenav'
import styles from '../styles/Admin.module.scss'

export default function Admin() {
    return (
        <div className={styles.main}>
            <SideNav />
        </div>
    )
}