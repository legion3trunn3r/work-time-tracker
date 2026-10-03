import type { TimeEntry } from '../../types/timeEntry'
import { formatDuration } from '../../utils/formatDuration'
import { TimeEntryItem } from './TimeEntryItem'
import styles from '../../styles/TimeEntryList.module.scss'

interface TimeEntryListProps {
  entries: TimeEntry[]
  totalDurationMs: number
  onRemoveEntry: (id: string) => void
}

export const TimeEntryList = ({ entries, totalDurationMs, onRemoveEntry }: TimeEntryListProps) => {
  if (entries.length === 0) {
    return (
      <section className={styles['time-entry-list']}>
        <h2 className={styles.title}>История</h2>
        <p className={styles.empty}>Записей пока нет. Укажите задачу и запустите секундомер.</p>
      </section>
    )
  }

  return (
    <section className={styles['time-entry-list']}>
      <div className={styles.heading}>
        <h2 className={styles.title}>История</h2>
        <span className={styles.total}>Всего: {formatDuration(totalDurationMs)}</span>
      </div>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <TimeEntryItem key={entry.id} entry={entry} onRemove={onRemoveEntry} />
        ))}
      </ul>
    </section>
  )
}
