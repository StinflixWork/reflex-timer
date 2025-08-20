import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import { pluralizeSeconds } from '@/utils/pluralizeSeconds.ts'
import styles from './Modal.module.scss'

export interface ModalRef {
	open: () => void
}

interface ModalProps {
	targetTime: number
	timeRemaining: number
	onReset: () => void
}

export const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
	const { targetTime, timeRemaining, onReset } = props

	const dialog = useRef<HTMLDialogElement | null>(null)

	const isUserLost = timeRemaining <= 0
	const formattedRemainingTime = (timeRemaining / 1000).toFixed(2)
	const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)

	const portalRoot = document.getElementById('modal') as HTMLElement

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current?.showModal()
		}
	}))

	return createPortal(
		<dialog className={styles.resultModal} ref={dialog}>
			<h2>{isUserLost ? 'You lost' : `Your Score: ${score}`}</h2>
			<p>
				The target time was <strong>{pluralizeSeconds(targetTime)}</strong>
			</p>
			<p>
				You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
			</p>
			<form method='dialog' onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>,
		portalRoot
	)
})
