import SideNav from '../components/Sidenav'
import styles from '../styles/components/Header.module.scss'

export default function Header() {
    return (
        <div className={styles.header}>
            <ul>
                <li>
                    <a>Marketplace</a>
                </li>
                <li>
                    <a>Users</a>
                </li>
            </ul>
            <a><div className={styles.profile + ' flex'}>DE</div></a>
        </div>
    )
}