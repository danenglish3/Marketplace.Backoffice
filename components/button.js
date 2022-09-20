import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import styles from '../styles/components/Button.module.scss'

export default function Button(props) {
    return (
        <div className={`${styles.button} ${styles[props.type]} ${props.disabled ? styles.disabled : ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.innerText}
        </div>
    )
}