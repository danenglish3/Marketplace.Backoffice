import React, { useState } from 'react';
import styles from '../styles/Marketplace.module.scss'

import { faJoint } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

import SideNav from '../components/layout/Sidenav'
import Categories from '../components/content/Categories'
import Products from '../components/content/Products'

export default function Marketplace(props) {
    const [activeSection, setActiveSection] = useState("Quick links");

    let navItems = [
        {title: 'Quick links', icon: faFlag},
        {title: 'Categories', icon: faCartShopping},
        {title: 'Products', icon: faJoint},
        {title: 'Reports', icon: faChartLine},
        {title: 'Settings', icon: faGear},
    ]; 

    const sectionChange = (index) => {
        let section = navItems[index].title;
        setActiveSection(section);
    }

    return (
        <div className={styles.marketplace}>
            <SideNav 
                navItems={navItems}
                handleNavChange={sectionChange}
            />
			<div className={styles.content}>
                {activeSection === "Quick links" && <div></div>}
                {activeSection === "Categories" && <Categories {...props}/>}
                {activeSection === "Products" && <Products {...props}/>}
			</div>
        </div>
    )
}