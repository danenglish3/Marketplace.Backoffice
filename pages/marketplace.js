import SideNav from '../components/Sidenav'
import styles from '../styles/Marketplace.module.scss'

import { faJoint } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Marketplace(props) {
    let navItems = [
        {title: 'Categories', icon: faCartShopping},
        {title: 'Products', icon: faJoint},
        {title: 'Reports', icon: faChartLine},
        {title: 'Settings', icon: faGear},
    ]; 

    return (
        <div className={styles.marketplace}>
            <SideNav 
                navItems={navItems}
            />
			<div className={styles.content}>
                <h1>Marketplace</h1>
			</div>
        </div>
    )
}