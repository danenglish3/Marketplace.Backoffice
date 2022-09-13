import styles from '../styles/components/SideNav.module.scss'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function SideNav(props) {
    const [activeNav, setActiveNav] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handleClick = (index) => {
        if (activeNav === index) {
            return;
        }

        setActiveNav(index);

        if (props.handleNavChange != null && typeof props.handleNavChange == "function") {
            props.handleNavChange(index)
        }
    }

    const menuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={`${styles.sidenav} ${isMenuOpen ? styles.open : styles.collapsed}`}>
            <a onClick={menuToggle} className={styles.menuToggle}><FontAwesomeIcon icon={faBars}/></a>
            <ul>
                {props.navItems.map((item, ii) => {
                    return <li key={ii} onClick={handleClick.bind(this, ii)}>
                                <a className={`${ii === activeNav ? styles.active : ''}`}>
                                    <span>{item.title}</span>
                                    <FontAwesomeIcon className={styles.icon} icon={item.icon}/>
                                </a>
                            </li>
                })}
            </ul>
        </div>
    )
}