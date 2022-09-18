import React, { useState, useEffect } from 'react';
import styles from '../../styles/components/Header.module.scss'
import { useRouter } from 'next/router'

export default function Header(props) {
    const router = useRouter();
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);
    const [activePage, setActivePage] = useState("");

    function toggleMenu() {
        setIsSideNavOpen(!isSideNavOpen);
    }

    function handleClick(e) {
        setActivePage(e.href);
    }

    useEffect(() => {
        setActivePage(window.location.pathname);
    });
    
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <span>MP</span>
            </div>
            <div className={styles.right}>
                <ul>
                    <li>
                        <a href='/' onClick={handleClick} className={activePage == "/" ? styles.active : ""}>Dashboard</a>
                    </li>
                    <li>
                        <a href='/marketplace' onClick={handleClick}  className={activePage == "/marketplace" ? styles.active : ""}>Marketplace</a>
                    </li>
                    <li>
                        <a href='/users' onClick={handleClick}  className={activePage == "/users" ? styles.active : ""}>Users</a>
                    </li>
                </ul>
                <a><div className={styles.profile + ' flex'}>DE</div></a>                
            </div>
        </div>
    )
}