import styles from '../styles/components/SideNav.module.scss'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SideNav(props) {
    const [activeNav, setActiveNav] = useState(0);
    const handleClick = (index) => {
        if (activeNav === index) {
            return;
        }

        setActiveNav(index);
    }

    return (
        <div className={styles.sidenav}>
            <ul>
                {props.navItems.map((item, ii) => {
                    return <li key={ii} onClick={handleClick.bind(this, ii)}>
                                <a className={ii === activeNav ? styles.active : ''}>
                                    <span>{item.title}</span>
                                    <FontAwesomeIcon className={styles.icon} icon={item.icon}/>
                                </a>
                            </li>
                })}
            </ul>
        </div>
    )
}