import { STOPWATCH_STATUS_LABELS } from '../constants/stopwatch'
import type { StopwatchStatus } from '../types/stopwatch'
import { classNames } from '../utils/classNames'
import { splitDuration } from '../utils/formatDuration'
import styles from '../styles/Stopwatch.module.scss'

interface StopwatchProps {
  elapsedMs: number
  status: StopwatchStatus
}

export const Stopwatch = ({ elapsedMs, status }: StopwatchProps) => {
  const { hours, minutes, seconds, tenths } = splitDuration(elapsedMs)

  return (
    <div className={styles.stopwatch}>
      <span className={classNames(styles.status, styles[`_${status}`])}>{STOPWATCH_STATUS_LABELS[status]}</span>
      <p className={styles.time} role="timer">
        {hours}:{minutes}:{seconds}
        <span className={styles.tenths}>.{tenths}</span>
      </p>
    </div>
  )
}
