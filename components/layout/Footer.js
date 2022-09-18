import styles from '../../styles/components/Footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <li>
                    <a>Marketplace Application</a>
                </li>
                <li>
                    <a>API Tester</a>
                </li>
            </ul>
        </div>
    )
}