import { useCallback } from 'react'
import { Trash2 } from 'lucide-react'

import type { TimeEntry } from '../../types/timeEntry'
import { formatDateTime } from '../../utils/formatDateTime'
import { formatDuration } from '../../utils/formatDuration'
import { Button, ButtonVariant } from '../ui/Button'
import styles from '../../styles/TimeEntryList.module.scss'

interface TimeEntryItemProps {
  entry: TimeEntry
  onRemove: (id: string) => void
}

export const TimeEntryItem = ({ entry, onRemove }: TimeEntryItemProps) => {
  const handleRemove = useCallback(() => onRemove(entry.id), [entry.id, onRemove])

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
        icon={<Trash2 aria-hidden="true" />}
        onClick={handleRemove}
        aria-label={`Удалить запись «${entry.taskName}»`}
        title="Удалить запись"
      />
    </li>
  )
}
