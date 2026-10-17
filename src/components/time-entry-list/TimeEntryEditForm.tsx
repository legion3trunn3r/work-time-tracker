import { useCallback, useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import { Check, X } from 'lucide-react'

import {
    DURATION_INPUT_MAX_LENGTH,
    DURATION_INPUT_PLACEHOLDER,
    DURATION_INVALID_MESSAGE,
    ESCAPE_KEY,
    MIN_ENTRY_DURATION_MS,
    TASK_NAME_MAX_LENGTH,
    TASK_NAME_REQUIRED_MESSAGE,
} from '../../constants/stopwatch'
import type { TimeEntry, TimeEntryUpdate } from '../../types/timeEntry'
import { formatDuration } from '../../utils/formatDuration'
import { parseDuration } from '../../utils/parseDuration'
import { Button, ButtonVariant } from '../ui/Button'
import { TextField } from '../ui/TextField'
import styles from '../../styles/TimeEntryList.module.scss'

interface TimeEntryEditFormProps {
    entry: TimeEntry
    onSave: (update: TimeEntryUpdate) => void
    onCancel: () => void
}

interface EditFormErrors {
    taskName: string | null
    duration: string | null
}

const NO_ERRORS: EditFormErrors = { taskName: null, duration: null }

export const TimeEntryEditForm = ({ entry, onSave, onCancel }: TimeEntryEditFormProps) => {
    const initialDurationText = formatDuration(entry.durationMs)
    const [taskName, setTaskName] = useState(entry.taskName)
    const [durationText, setDurationText] = useState(initialDurationText)
    const [errors, setErrors] = useState<EditFormErrors>(NO_ERRORS)

    const handleTaskNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value)
        setErrors((previous) => ({ ...previous, taskName: null }))
    }, [])

    const handleDurationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDurationText(event.target.value)
        setErrors((previous) => ({ ...previous, duration: null }))
    }, [])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLFormElement>) => {
            if (event.key === ESCAPE_KEY) {
                onCancel()
            }
        },
        [onCancel],
    )

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const trimmedTaskName = taskName.trim()
            const isDurationUntouched = durationText.trim() === initialDurationText
            const durationMs = isDurationUntouched ? entry.durationMs : parseDuration(durationText)

            const nextErrors: EditFormErrors = {
                taskName: trimmedTaskName ? null : TASK_NAME_REQUIRED_MESSAGE,
                duration: durationMs !== null && durationMs >= MIN_ENTRY_DURATION_MS ? null : DURATION_INVALID_MESSAGE,
            }

            if (nextErrors.taskName !== null || nextErrors.duration !== null || durationMs === null) {
                setErrors(nextErrors)
                return
            }

            onSave({ taskName: trimmedTaskName, durationMs })
        },
        [taskName, durationText, initialDurationText, entry.durationMs, onSave],
    )

    return (
        <form className={styles['edit-form']} onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
            <div className={styles['edit-fields']}>
                <TextField
                    label="Название задачи"
                    value={taskName}
                    maxLength={TASK_NAME_MAX_LENGTH}
                    error={errors.taskName}
                    autoComplete="off"
                    autoFocus
                    onChange={handleTaskNameChange}
                />
                <TextField
                    label="Время (ЧЧ:ММ:СС)"
                    value={durationText}
                    placeholder={DURATION_INPUT_PLACEHOLDER}
                    maxLength={DURATION_INPUT_MAX_LENGTH}
                    inputMode="numeric"
                    error={errors.duration}
                    autoComplete="off"
                    onChange={handleDurationChange}
                />
            </div>
            <div className={styles['edit-actions']}>
                <Button variant={ButtonVariant.Secondary} icon={<X aria-hidden="true" />} onClick={onCancel}>
                    Отмена
                </Button>
                <Button type="submit" icon={<Check aria-hidden="true" />}>
                    Сохранить
                </Button>
            </div>
        </form>
    )
}