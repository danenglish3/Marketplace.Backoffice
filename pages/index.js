import styles from '../styles/Home.module.scss'
import SideNav from '../components/layout/Sidenav'

import { faGear } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
	let navItems = [
        {title: 'Settings', icon: faGear},
    ]; 

	return (
		<div className={styles.home}>
			<SideNav 
                navItems={navItems}
			/>
			<div className={styles.content}>
				<h1>ADMIN</h1>
			</div>
		</div>
	)
}
