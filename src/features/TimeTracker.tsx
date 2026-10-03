import { useCallback, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Pause, Play, Square } from 'lucide-react'

import { MIN_ENTRY_DURATION_MS, TASK_NAME_MAX_LENGTH, TASK_NAME_REQUIRED_MESSAGE } from '../constants/stopwatch'
import { StopwatchStatus } from '../types/stopwatch'
import { useStopwatch } from '../hooks/useStopwatch'
import { useTimeEntries } from '../hooks/useTimeEntries'
import { Stopwatch } from '../components/Stopwatch'
import { TimeEntryList } from '../components/time-entry-list/TimeEntryList'
import { Button, ButtonVariant } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { useTimerDocumentTitle } from '../hooks/useTimerDocumentTitle'
import styles from '../styles/TimeTracker.module.scss'

export const TimeTracker = () => {
  const [taskName, setTaskName] = useState('')
  const [taskNameError, setTaskNameError] = useState<string | null>(null)
  const { status, elapsedMs, start, pause, stop } = useStopwatch()
  const { entries, totalDurationMs, addEntry, removeEntry } = useTimeEntries()

  const isIdle = status === StopwatchStatus.Idle
  const isRunning = status === StopwatchStatus.Running

  useTimerDocumentTitle(elapsedMs, taskName, !isIdle)

  const handleTaskNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
    setTaskNameError(null)
  }, [])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isRunning) {
        return
      }

      if (!taskName.trim()) {
        setTaskNameError(TASK_NAME_REQUIRED_MESSAGE)
        return
      }

      start()
    },
    [isRunning, taskName, start],
  )

  const handleStop = useCallback(() => {
    const durationMs = stop()

    if (durationMs >= MIN_ENTRY_DURATION_MS) {
      addEntry({ taskName: taskName.trim(), durationMs, finishedAt: new Date().toISOString() })
    }

    setTaskName('')
  }, [stop, addEntry, taskName])

  return (
    <div className={styles['time-tracker']}>
      <form className={styles.panel} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Над чем вы работаете?"
          placeholder="Например, подготовить отчёт"
          value={taskName}
          maxLength={TASK_NAME_MAX_LENGTH}
          disabled={!isIdle}
          error={taskNameError}
          autoComplete="off"
          onChange={handleTaskNameChange}
        />
        <Stopwatch elapsedMs={elapsedMs} status={status} />
        <div className={styles.controls}>
          {isRunning ? (
              <Button key="pause" icon={<Pause aria-hidden="true" />} onClick={pause}>
                  Пауза
              </Button>
          ) : (
              <Button key="start" type="submit" icon={<Play aria-hidden="true" />}>
                {isIdle ? 'Старт' : 'Продолжить'}
              </Button>
          )}
          {!isIdle && (
            <Button variant={ButtonVariant.Secondary} icon={<Square aria-hidden="true" />} onClick={handleStop}>
              Стоп и сохранить
            </Button>
          )}
        </div>
      </form>
      <TimeEntryList entries={entries} totalDurationMs={totalDurationMs} onRemoveEntry={removeEntry} />
    </div>
  )
}
