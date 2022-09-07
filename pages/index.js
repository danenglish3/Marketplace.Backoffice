import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className='main'>
        <h1 className={styles.title}>
          Welcome to the Backoffice!
        </h1>

        <div className={styles.grid}>
          <a href="/admin" className={styles.card}>
            <h2>Admin &rarr;</h2>
            <p>Update categories and items.</p>
          </a>

          <a href="/users" className={styles.card}>
            <h2>Users &rarr;</h2>
            <p>Everything about the userbase</p>
          </a>
        </div>
    </div>
  )
}
