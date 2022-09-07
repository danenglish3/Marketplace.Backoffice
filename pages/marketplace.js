import SideNav from '../components/Sidenav'
import styles from '../styles/Marketplace.module.scss'

export default function Marketplace() {
    return (
        <div className="marketplace">
            <SideNav />
			<div className={styles.content}>
                <h1>Marketplace</h1>
			</div>
        </div>
    )
}