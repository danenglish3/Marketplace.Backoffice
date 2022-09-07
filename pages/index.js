import styles from '../styles/Home.module.scss'
import SideNav from '../components/Sidenav'

export default function Home() {
	return (
		<div className={styles.home}>
			<SideNav />
			<div className={styles.content}>
				<h1>ADMIN</h1>
			</div>
		</div>
	)
}
