import { useRef, useState } from 'react'
import { Modal } from '@/components/Modal'
import { pluralizeSeconds } from '@/utils/pluralizeSeconds.ts'
import styles from './TimerChallenge.module.scss'

interface TimerChallengeProps {
	level: string
	targetTime: number
}

export const TimerChallenge = ({ level, targetTime }: TimerChallengeProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const timer = useRef<any>(null)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dialog = useRef<any>(null)
	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

	if (!timerIsActive) {
		clearInterval(timer.current)
		dialog.current?.open()
	}

	const handleStart = () => {
		timer.current = setInterval(() => {
			setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
		}, 10)
	}

	const handleReset = () => {
		setTimeRemaining(targetTime * 1000)
	}

	const handleStop = () => {
		clearInterval(timer.current)
		dialog.current?.open()
	}

	return (
		<div className={styles.root}>
			<Modal
				ref={dialog}
				targetTime={targetTime}
				timeRemaining={timeRemaining}
				onReset={handleReset}
			/>
			<div className={styles.level}>
				<h2 className={styles.title}>{level}</h2>
				<span className={styles.subtitle}>{pluralizeSeconds(targetTime)}</span>
			</div>
			<div className={styles.timer}>
				<button className={styles.timerBtn} onClick={timerIsActive ? handleStop : handleStart}>
					{timerIsActive ? 'Stop' : 'Start'} Challenge
				</button>
				<p className={styles.timerStatus}>
					{timerIsActive ? 'Time is running...' : 'Timer inactive'}
				</p>
			</div>
		</div>
	)
}
