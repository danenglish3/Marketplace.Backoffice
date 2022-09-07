import styles from '../styles/components/SideNav.module.scss'

export default function SideNav() {
    return (
        <div className={styles.sidenav}>
            <div>Categories</div>
            <div>Products</div>
        </div>
    )
}