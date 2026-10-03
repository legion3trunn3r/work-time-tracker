import { APP_NAME, APP_TAGLINE, LOGO_SIZE_PX, LOGO_SRC } from './constants/brand'
import { TimeTracker } from './features/TimeTracker'
import styles from './styles/App.module.scss'

const App = () => (
    <main className={styles.app}>
        <header className={styles.header}>
            <img className={styles.logo} src={LOGO_SRC} width={LOGO_SIZE_PX} height={LOGO_SIZE_PX} alt="" />
            <h1 className={styles.title}>{APP_NAME}</h1>
            <p className={styles.subtitle}>{APP_TAGLINE}</p>
        </header>
        <TimeTracker />
    </main>
)

export default App