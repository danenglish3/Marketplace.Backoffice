import styles from '../styles/components/SideNav.module.scss'

export default function SideNav() {
    return (
        <div className={styles.sidenav}>
            <div className={styles.navLink}>Categories</div>
            <div className={styles.navLink}>Products</div>
        </div>
    )
}