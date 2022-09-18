import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import styles from '../styles/components/Button.module.scss'

export default function Button(props) {
    return (
        <div className={`${styles.button} ${styles[props.type]}`}
            onClick={props.onClick}
        >
            {props.innerText}
        </div>
    )
}