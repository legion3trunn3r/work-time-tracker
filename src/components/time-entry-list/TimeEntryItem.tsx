import { useCallback, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

import type { TimeEntry, TimeEntryUpdate } from '../../types/timeEntry'
import { formatDateTime } from '../../utils/formatDateTime'
import { formatDuration } from '../../utils/formatDuration'
import { Button, ButtonVariant } from '../ui/Button'
import { TimeEntryEditForm } from './TimeEntryEditForm'
import styles from '../../styles/TimeEntryList.module.scss'

interface TimeEntryItemProps {
    entry: TimeEntry
    onUpdate: (id: string, update: TimeEntryUpdate) => void
    onRemove: (id: string) => void
}

export const TimeEntryItem = ({ entry, onUpdate, onRemove }: TimeEntryItemProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditStart = useCallback(() => setIsEditing(true), [])
    const handleEditCancel = useCallback(() => setIsEditing(false), [])
    const handleRemove = useCallback(() => onRemove(entry.id), [entry.id, onRemove])

    const handleSave = useCallback(
        (update: TimeEntryUpdate) => {
            onUpdate(entry.id, update)
            setIsEditing(false)
        },
        [entry.id, onUpdate],
    )

    if (isEditing) {
        return (
            <li className={styles.item}>
                <TimeEntryEditForm entry={entry} onSave={handleSave} onCancel={handleEditCancel} />
            </li>
        )
    }

    return (
        <li className={styles.item}>
            <div className={styles.info}>
                <span className={styles.name}>{entry.taskName}</span>
                <time className={styles.date} dateTime={entry.finishedAt}>
                    {formatDateTime(entry.finishedAt)}
                </time>
            </div>
            <span className={styles.duration}>{formatDuration(entry.durationMs)}</span>
            <Button
                variant={ButtonVariant.Ghost}
                icon={<Pencil aria-hidden="true" />}
                onClick={handleEditStart}
                aria-label={`Редактировать запись «${entry.taskName}»`}
                title="Редактировать запись"
            />
            <Button
                variant={ButtonVariant.Ghost}
                icon={<Trash2 aria-hidden="true" />}
                onClick={handleRemove}
                aria-label={`Удалить запись «${entry.taskName}»`}
                title="Удалить запись"
            />
        </li>
    )
}