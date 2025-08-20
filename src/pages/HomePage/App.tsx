import { TimerChallenge } from '@/components/TimerChallenge'
import styles from './App.module.scss'

export const App = () => {
	return (
		<main className={styles.root}>
			<div className={styles.heading}>
				<h1 className={styles.title}>
					The <strong>almost</strong> final countdown
				</h1>
				<h2 className={styles.subtitle}>
					Stop the timer once you estimate that time is (almost) up
				</h2>
			</div>
			<div className={styles.content}>
				<TimerChallenge level='Easy' targetTime={1} />
				<TimerChallenge level='Not easy' targetTime={5} />
				<TimerChallenge level='Medium' targetTime={10} />
				<TimerChallenge level='Hard' targetTime={15} />
			</div>
		</main>
	)
}
